
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    jwt.verify(req.body.jwt, process.env.SECRET_KEY! , function(err: any , decoded: any) {
        if (err) {
            res.json({status:"error", message: err.message, data:null});
        }else{
            req.body.userId = decoded.id;
            next();
        }
    });
}
