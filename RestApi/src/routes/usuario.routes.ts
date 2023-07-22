import { Router, request, response } from "express";
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

router.post('/cadastrar', async(request, response) => {
    const registro = request.body;

    const service = new UsuarioService();

    const retorno = service.UsuarioSalvar(registro);

    return response.json(retorno);
});

router.get('/teste', autenticacao, async(request, response) => {
    return response.json({Message: 'bateuuuu'});
});

export default router;