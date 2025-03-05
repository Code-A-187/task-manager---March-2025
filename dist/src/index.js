"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const user_model_1 = __importDefault(require("./user.model"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
(0, db_1.connectDB)().then(() => {
    app.get('/', (req, res) => {
        res.send("Hello, Task Manager API!");
    });
    app.post('/register', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = new user_model_1.default({ email, password });
            await user.save();
            res.status(201).json({ message: 'User registered successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Could not register user' });
        }
    });
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
