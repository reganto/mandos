import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = "http://localhost:8000/api/v1/";

export default function Tasks(props) {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        async function getTasks() {
            const result = await axios.get(URL);
            setTasks(result.data);
        }
        getTasks();  
        return () => {
            console.log("cleanup");
        }
    }, [])
    return (
        <div style={{ width: "40%" }}>
            <div className="form-group row">
                <input type="text" name="entry" id="entry" className="form-control col" placeholder="Add a new task..." />
                <button type="submit" className="btn btn-primary col-2">Submit</button>
            </div>
            <br />
            <div>
                {tasks.map(task => (
                    <div key={task.id} className="row">
                        <div className="form-control col" style={{ textAlign: "left" }}>{task.title}</div>
                        <div className="col-1">
                            <a href="/"><img src="edit-color.webp" alt="edit" width={35} height={35} /></a>
                        </div>
                        <div className="col-1">
                            <a href="/"><img src="delete-color.webp" alt="delete" width={35} height={35} /></a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
