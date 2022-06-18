import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = "http://localhost:8000/api/v1/";

export default function Tasks(props) {
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState("");
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        async function getTasks() {
            const { data: result } = await axios.get(URL);
            setTasks(result);
        }
        getTasks();
    }, [activeTask])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editing) {
            const result = await axios.put(`${URL}${activeTask.id}/`, { title: activeTask });
            console.log(result.data)
            setEditing(false)
            setActiveTask("")
        }
        await axios.post(URL, { title: activeTask });
        setActiveTask("");
    }

    const handleDelete = async (task) => {
        await axios.delete(`${URL}${task.id}`);

        const cpTasks = [...tasks];
        cpTasks.filter(t => t.id !== task.id);
        setTasks(cpTasks);
    }

    const handleDone = async (task) => {
        const { data: t } = await axios.patch(`${URL}${task.id}/`, { completed: !task.completed });
        const cpTasks = [...tasks];
        cpTasks[task] = t
        setTasks(cpTasks)
    }

    const handleEdit = async (task) => {
        setEditing(true)
        setActiveTask(task)
    }

    return (
        <div style={{ width: "40%" }}>
            <div className="form-group row">
                <input type="text" name="entry" id="entry" className="form-control col" placeholder="Add a new task..." onChange={e => setActiveTask(e.target.value)} value={activeTask.title} />
                <button type="submit" className="btn btn-primary col-2" onClick={e => handleSubmit(e)}>Submit</button>
            </div>
            <br />
            <div>
                {tasks.map(task => (
                    <div key={task.id} className="row">
                        <div className="form-control col" style={{ textAlign: "left", textDecoration: task.completed ? "line-through" : "" }} onClick={() => handleDone(task)}>{task.title}</div>
                        <div className="col-1">
                            <img src="edit-color.webp" alt="edit" width={35} height={35} onClick={() => handleEdit(task)} style={{ cursor: "pointer" }} />
                        </div>
                        <div className="col-1">
                            <img src="delete-color.webp" alt="delete" width={35} height={35} onClick={() => handleDelete(task)} style={{ cursor: "pointer" }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
