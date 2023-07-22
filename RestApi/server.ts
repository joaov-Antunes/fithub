import express, { Request, Response, request, response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import router from './src/routes';
import db from './src/dbConfig';

dotenv.config();

db
.initialize()
.then(() => {
    console.log('Banco de dados rodando');
})
.catch((err) => {
    console.error("Error during Data Source initialization:", err)
});

const app = express();

app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cors());

const port = process.env.PORT || 3308;

app.use('/', router);

app.use((request: Request, response: Response) => {
    if(response.statusCode < 400) {
        response.status(200);
        return;
    }

    response.status(500).json({ Message: 'Internal server error' });
});

app.listen(port, () => {
    console.log('🚀 servidor rodando na porta %d', port);
});
