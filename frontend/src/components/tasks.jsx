import { Component } from 'react';
import axios from 'axios';

const URL = "http://localhost:8000/api/v1/"

export default class Tasks extends Component {
    state = {
        tasks: [],
        activeTask: {},
        editing: false,
    }
    async componentDidMount() {
        const { data: tasks } = await axios.get(URL);
        this.setState({ tasks })
    }
    handleAdd = async () => {
        // Update task
        if (this.state.editing) {
            const { activeTask } = this.state;
            const { data: task } = await axios.patch(`${URL}${activeTask.id}/`, { title: activeTask.title });
            // Update UI
            const tasks = [...this.state.tasks]
            const index = tasks.findIndex(() => activeTask);
            tasks[index] = { ...task }
            this.setState({ tasks: tasks, activeTask: { title: "", completed: false, id: "" }, editing: false })
            return
        }
        // Add task
        const { data: task } = await axios.post(URL, this.state.activeTask);

        // Update UI
        const tasks = [task, ...this.state.tasks];
        this.setState({ tasks: tasks, activeTask: { title: "" } })
    }
    handleDelete = async (task) => {
        // delete task from server
        await axios.delete(`${URL}${task.id}/`);

        // update UI
        const tasks = this.state.tasks.filter(t => t.id !== task.id)
        this.setState({ tasks })
    }
    handleDone = async (task) => {
        // change state of task to completed in server
        const { data: update_task } = await axios.patch(`${URL}${task.id}/`, { completed: !task.completed });
        // console.log(t)

        // update ui
        const tasks = [...this.state.tasks];
        const index = tasks.indexOf(task)
        tasks[index] = { ...update_task }
        this.setState({ tasks })
    }
    handleEdit = (task) => {
        this.setState({ editing: true, activeTask: { title: task.title, completed: task.completed, id: task.id } });
    }
    handleChange = ({ currentTarget: input }) => {
        let activeTask = { ...this.state.activeTask };
        activeTask.title = input.value;
        this.setState({ activeTask })
    }
    render() {
        return (
            <div style={{ width: "40%" }}>
                <div className="form-group row">
                    <input
                        type="text"
                        name="entry"
                        id="entry"
                        className="form-control col"
                        placeholder="Add a new task..."
                        onChange={this.handleChange}
                        value={this.state.activeTask.title} />
                    <button type="submit" className="btn btn-primary col-2" onClick={this.handleAdd}>Submit</button>
                </div>
                <br />
                <div>
                    {this.state.tasks.map((task, index) => (
                        <div key={index} index={index} className="row">
                            <div
                                className="form-control col"
                                style={{ textAlign: "left", textDecoration: task.completed ? "line-through" : "" }}
                                onClick={() => this.handleDone(task)}
                            >
                                {task.title}
                            </div>
                            <div className="col-1">
                                <img
                                    src="edit-color.webp"
                                    alt="edit"
                                    width={35}
                                    height={35}
                                    onClick={() => this.handleEdit(task)}
                                    style={{ cursor: "pointer" }} />
                            </div>
                            <div className="col-1">
                                <img
                                    src="delete-color.webp"
                                    alt="delete"
                                    width={35}
                                    height={35}
                                    onClick={() => this.handleDelete(task)}
                                    style={{ cursor: "pointer" }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
