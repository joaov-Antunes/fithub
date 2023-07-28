import { Repository } from "typeorm";
import myDataSource from "../dbConfig";
import { Usuario } from '../models/entities/Usuario';
import { AutenticacaoDTO, AutenticacaoRetornoDTO } from "../DTO/autenticacaoDTO";
import Utilitarios from "../utilitarios/Utilitarios";
import { sign } from 'jsonwebtoken';
import AppError from "../errors/AppError";

class AutenticacaoService {
    usuario: Repository<Usuario>;

    constructor() {
        this.usuario = myDataSource.getRepository(Usuario);
    }

    public async Autenticar({Email, Senha}: AutenticacaoDTO): Promise<AutenticacaoRetornoDTO | Error> {
        let access_token: string;

        const senhaHash: string = await Utilitarios.gerarHash(Senha);

        const usuario: Usuario = await this.usuario.createQueryBuilder('usuario')
                                                    .where('usuario.Email = :email', {
                                                        email: Email
                                                    })
                                                    .getOne();

        if(!usuario) {
            throw new AppError('Usuario ou senha inválidos', 400);
        }
        
        if(usuario.Senha !== senhaHash) {
            throw new AppError('Usuario ou senha inválidos', 400);
        }

        delete usuario.Senha;

        access_token = sign({
            usuario: usuario,
            Id: usuario.IdEnc,
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