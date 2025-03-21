import { useEffect, useState } from "react"
import { getTasks } from "@/services/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

interface Task {
    title: string,
    description: string,
}

const TaskList = () => {
    const [tasks, setTasks] = useState<(Task[])>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
                setIsLoading(false)
            } catch (err: any) {
                setError(err.message);
                setIsLoading(false);
            }
        }; fetchTasks();

    }, [])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>


    return (
        <div className="space-y-4">
            <h2>Task List</h2>
            <div className="space-y-2">
                {tasks.map((task, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{task.title}</CardTitle>
                            <CardDescription>{task.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
export default TaskList