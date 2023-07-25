import express, { NextFunction, Request, Response } from "express";

const errorhandling = async function(err: Error, request: Request, response: Response, next: NextFunction): Promise<void> {
    if(err) {
        response.status(response.statusCode).json({ Message: response.statusMessage });
        next();
    }
    
    response.status(200).json({ Message: response.statusMessage });
    next();
}

export default errorhandling;