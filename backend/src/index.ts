import express, { Request, Response } from 'express';
import { connectDB } from './db';

const app = express();
const port = 3000;

connectDB().then(() => {
    app.get('/', (req: Request, res: Response) => {
        res.send("Hello, Task Manager API!");
    });
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
