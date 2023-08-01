import { Repository } from "typeorm";
import { Treino } from "../models/entities/Treino";
import db from "../dbConfig";
import TreinoDTO from "../DTO/treinoDTO";
import GrupoMuscularId from "../models/enum/grupoMuscularEnum";

class TreinoService {
    treino: Repository<Treino>
    
    constructor() {
        this.treino = db.getRepository(Treino);
    }

    public async TreinoCriar(registro: TreinoDTO): Promise<Treino> {
        switch(registro.GrupoMuscular) {
            case 'Peito':
                registro.GrupoMuscularId = GrupoMuscularId.Peito;
                break;

            case 'Braço':
                registro.GrupoMuscularId = GrupoMuscularId.Braco;
                break;

            case 'Ombro':
                registro.GrupoMuscularId = GrupoMuscularId.Ombro;
                break;
                
            case 'Costas':
                registro.GrupoMuscularId = GrupoMuscularId.Costas;
                break;

            case 'Abdome':
                registro.GrupoMuscularId = GrupoMuscularId.Costas;
                break;

            case 'Perna':
                registro.GrupoMuscularId = GrupoMuscularId.Costas;
                break;

            case 'Gluteo':
                registro.GrupoMuscularId = GrupoMuscularId.Costas;
                break;

            case 'Panturrilha':
                registro.GrupoMuscularId = GrupoMuscularId.Costas;
                break;
            
            default:
                throw new Error('Esse grupo muscular não existe');
        }

        delete registro.GrupoMuscular;

        const retorno: Treino = this.treino.create(registro);

        await this.treino.save(retorno);

        return retorno;
    }

    public async TreinoListar(id: number): Promise<Treino[]> {
        const retorno: Treino[] = await this.treino.find({
            where: {
                UsuarioId: id
            }
        });

        return retorno;
    }
}

export default TreinoService;