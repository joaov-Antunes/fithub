import express, { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const errorhandling = async function(err: Error, request: Request, response: Response, next: NextFunction): Promise<void> {
    if (err instanceof AppError) {
        response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
        next();
    }

    if(err) {
        response.status(response.statusCode).json({ Message: response.statusMessage });
        next();
    }
    
    response.status(200).json({ Message: response.statusMessage });
    next();
}

export default errorhandling;