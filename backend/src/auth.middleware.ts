import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

const JWT_SECRET = "very-secret-key"

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token){
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) {
            res.sendStatus(403)
            return;
        }

        req.userId = decoded.userId

        next();
    });
}