import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { login } from "@/services/api"

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        let isValid = true

        if (!email) {
            setEmailError('Email is required');
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Invalid email format')
            isValid = false
        } else {
            setEmailError('')
        }
    

        if (!password) {
            setEmailError('Password is required');
            isValid = false
        } else if (password.length < 6) {
            setPasswordError("Password must be atleast 6 characters")
            isValid = false
        } else {
            setPasswordError('')
        }
        return isValid
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true)
            try {
                const data = await login(email, password);
                setIsLoading(false);
                console.log("Login Seccessful:", data);
            } catch (error) {
                setIsLoading(false);
                console.log("Login error:", error);
            }
        } else {
            console.log("Form is invalid");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                { emailError && <p className="text-red-500">{ emailError}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                { passwordError && <p className = "text-red-500">{ passwordError }</p>}
            </div>
            <Button className="mt-4" type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
            </Button>
        </form>
    );

}

export default LoginForm;