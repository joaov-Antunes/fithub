import { Repository } from "typeorm";
import db from "../dbConfig";
import { Usuario } from '../models/entities/Usuario';
import UsuarioTipoId from "../models/enum/usuarioTipoEnum";
import Utilitarios from "../utilitarios/Utilitarios";

class UsuarioService {
    usuario: Repository<Usuario>;

    constructor() {
        this.usuario = db.getRepository(Usuario);
    }

    public async UsuarioSalvar(registro: Usuario): Promise<Usuario> {
        registro.UsuariotipoId = UsuarioTipoId.Cliente;
        registro.Senha = await Utilitarios.gerarHash(registro.Senha);

        const retorno = this.usuario.create(registro);
        
        await this.usuario.save(retorno);

        return retorno;
    }
}

export default UsuarioService;