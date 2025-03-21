import { useState } from "react"
interface Task {
    title: string,
    description: string,
}

const TaskList = () => {
    const [tasks, setTasks] = useState<(Task[])>([
        { title: 'Learn React 19', description: 'Explore new React 19 features.' },
        { title: 'Build API Endpoints', description: 'Set up backend API for tasks.' },
        { title: 'Style Task List', description: 'Apply styles using Tailwind CSS.' },
    ]);

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <h3>{task.title}</h3>
                         <p>{task.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TaskList