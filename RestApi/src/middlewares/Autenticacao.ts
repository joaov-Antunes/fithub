import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response, request, response } from "express";
import { Usuario } from '../models/entities/Usuario';

declare global {
    namespace Express {
        interface Request {
            usuario?: Usuario;
        }
    }
}

const autenticacao = async function autenticacao(request: Request, response: Response, next: NextFunction): Promise<any> {
    let token: string = request.headers['authorization']; 

    token = token?.split(' ')[1];

    if (!token) {
        return response.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded: any) => {
        if (err) {
            return response.status(401).json({ message: 'Token inválido' });
        }

        // Se tudo estiver correto, você pode adicionar o objeto do usuário decodificado à requisição
        // para que outras rotas tenham acesso a essas informações, se necessário.
        request.usuario = decoded.usuario as Usuario;
        
        next();
    });
}

export default autenticacao;