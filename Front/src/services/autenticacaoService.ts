import AxiosService from "./axiosService";

class AutenticacaoService {
    axiosService: any;

    constructor(private axiosServ: AxiosService) {
        this.axiosService = this.axiosServ.Criar();
    }

    async Autenticar(registro: Object): Promise<any> {
        return this.axiosService.post('usuario/autenticar', registro);
    }
}

export default AutenticacaoService;