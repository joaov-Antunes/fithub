import express, { NextFunction, Request, Response, request, response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import router from './src/routes';
import db from './src/dbConfig';
import errorhandling from './src/middlewares/Error';

dotenv.config();

db.initialize();

const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cors());

const port = process.env.PORT || 3308;

app.use('/', router);

//middleware para tratamento global de erros
app.use(errorhandling);

app.listen(port, () => {
    console.log('🚀 servidor rodando na porta %d', port);
});
