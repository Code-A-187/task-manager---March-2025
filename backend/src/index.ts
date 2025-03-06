import express, { Request, Response } from 'express';
import { connectDB } from './db';
import User from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
   
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

});
