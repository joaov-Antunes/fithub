import { Router, Request, Response, NextFunction } from "express";
import AutenticacaoService from "../services/AutenticacaoService";
import autenticacao from "../middlewares/Autenticacao";
import UsuarioService from "../services/UsuarioService";

const router = Router();

router.post('/autenticar', async(request: Request, response: Response, next: NextFunction) => {
    const { Email, Senha } = request.body;

    const service = new AutenticacaoService();
    try {
        const retorno = await service.Autenticar({Email, Senha});

        return response.json(retorno);
    } catch(err) {
        response.status(400).json({ Message: response.statusCode });
    }
    
});

router.post('/cadastrar', async(request: Request, response: Response) => {
    const registro = request.body;

    const service = new UsuarioService();

    const retorno = service.UsuarioSalvar(registro);

    return response.json(retorno);
});

export default router;