import express, { json, Request, Response } from 'express';
import { connectDB } from './db';
import User from './user.model';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;

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
        
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

});
