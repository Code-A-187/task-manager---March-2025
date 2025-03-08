import express, { Request, Response } from 'express';
import { connectDB } from './db';
import User from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateToken, AuthenticatedRequest } from './auth.middleware';
import Task from './task.model';

const app = express();
const port = 3000;
const JWT_SECRET: string = "very-secret-key"

app.use(express.json())


connectDB().then(() => {

    app.get('/', (req: Request, res: Response) => {
        res.send("Hello, Task Manager API!");
    });

    app.post('/register', async (req: Request, res: Response) => {
        try {
            const{ email, password } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({email, password: hashedPassword})
            await user.save()
            res.status(201).json({ message: 'User registered successfully' });        
        } catch (error) {
            res.status(500).json({ message: 'Could not register user'})
        }
    });

    app.post('/login', async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email });

            if (!user){
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const passwordMatch = await bcrypt.compare(password, user.password!);

            if (!passwordMatch){
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
            
        } catch (error) {
            res.status(500).json({ message: 'Could not Log in' })
        }
    });

    app.post('/tasks', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
        try {
            const task = new Task ({ ...req.body, userId: req.userId });
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            console.error("Task Creation Error:", error);
            res.status(500).json({ message: 'Could not create task' });
        }   
    });

    app.get('/tasks', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
        try {
            const tasks = await Task.find({ userId: req.userId });
            res.json(tasks);
        } catch (error) {
            console.error('Get Tasks Error', error);
            res.status(500).json({ message: 'Could not retrieve tasks' });
        }
    });

    app.get('/protected', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
        const userId = req.userId;
        res.json({ message: 'Protected route accessed', userId });
    });
   
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

});
