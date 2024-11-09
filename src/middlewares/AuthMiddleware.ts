import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: 'Token not provided' });
        return;
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded as { userId: string };
 
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token invalid' });
        return;
    }
};
