import 'reflect-metadata'; //deve ser a primeira linha
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import { AppDataSource } from '@shared/typeorm/data-source';
import 'express-async-errors';
import {errors} from "celebrate";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((error: Error, request:Request, response:Response, next:NextFunction)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: "Internal Server Error"
    })
})

AppDataSource.initialize()
.then(() => {
    console.log("Data Source initialized!");
app.listen(3333, ()=>{
    console.log('Server Started on port 3333!');
});   

}).catch((err)=>{
    console.error('Error during Data Source initialized', err)
});
