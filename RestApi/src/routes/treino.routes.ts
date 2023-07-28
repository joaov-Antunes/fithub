import { Router } from "express";
import { Request, Response } from 'express';
import TreinoService from "../services/TreinoService";
import { Usuario } from "../models/entities/Usuario";
import TreinoDTO from "../DTO/treinoDTO";
import autenticacao from "../middlewares/Autenticacao";

const router = Router();

router.post('/salvar', autenticacao, async(request: Request, response: Response) => {
    const registro: TreinoDTO = request.body;
    const usuario: Usuario = request.usuario;

    registro.UsuarioId = usuario.Id;
    
    const service = new TreinoService();

    const retorno = await service.TreinoCriar(registro);

    return response.json(retorno);
});

router.get('/listar', autenticacao, async(request: Request, response: Response) => {
    const usuarioId: number = request.usuario.Id;

    const service = new TreinoService();

    const retorno = await service.TreinoListar(usuarioId);
    
    return response.json(retorno);
});

export default router;