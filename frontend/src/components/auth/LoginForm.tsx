import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form>
        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button className="mt-4" type="submit">Login</Button>
    </form>
    );

}

export default LoginForm;