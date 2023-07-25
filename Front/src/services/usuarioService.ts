import AxiosService from "./axiosService";

class UsuarioService {
    private axiosService: any;

    constructor(private axiosServ: AxiosService) {
        this.axiosService = this.axiosServ.Criar();
    }

    async Cadastrar(registro: Object): Promise<any> {
        return this.axiosService.post('usuario/cadastrar', registro);
    }
}

export default UsuarioService;