import { Repository } from "typeorm";
import myDataSource from "../dbConfig";
import { Usuario } from '../models/entities/Usuario';
import { AutenticacaoDTO, AutenticacaoRetornoDTO } from "../DTO/autenticacaoDTO";
import Utilitarios from "../utilitarios/Utilitarios";
import { sign } from 'jsonwebtoken';

class AutenticacaoService {
    usuario: Repository<Usuario>;

    constructor() {
        this.usuario = myDataSource.getRepository(Usuario);
    }

    public async Autenticar({Email, Senha}: AutenticacaoDTO): Promise<AutenticacaoRetornoDTO> {
        let access_token: string;

        const senhaHash: string = await Utilitarios.gerarHash(Senha);

        const usuario: Usuario = await this.usuario.createQueryBuilder('usuario')
                        .where('usuario.Email = :email', {
                            email: Email
                        })
                        .getOne();

        if(!usuario) {
            throw new Error('Usuario ou senha inválidos');
        }
        
        if(usuario.Senha !== senhaHash) {
            throw new Error('Usuario ou senha inválidos');
        }

        access_token = sign({
            usuario: usuario,
            Id: usuario.Id,
            tipoId: usuario.UsuariotipoId,
        },
        process.env.SECRET,
        {
            expiresIn: '1d',
        });

        return { usuario, access_token};
    }
}

export default AutenticacaoService;