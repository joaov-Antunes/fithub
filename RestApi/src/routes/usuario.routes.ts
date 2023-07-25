import { Router, Request, Response } from "express";
import AutenticacaoService from "../services/AutenticacaoService";
import autenticacao from "../middlewares/Autenticacao";
import UsuarioService from "../services/UsuarioService";

const router = Router();

router.post('/autenticar', async(request, response) => {
    const { Email, Senha } = request.body;

    const service = new AutenticacaoService();

    const retorno = await service.Autenticar({Email, Senha});

    return response.json(retorno);
});

router.post('/cadastrar', async(request: Request, response: Response) => {
    const registro = request.body;

    const service = new UsuarioService();

    const retorno = service.UsuarioSalvar(registro);

    return response.json(retorno);
});

export default router;