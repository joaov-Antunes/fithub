import AxiosService from "./axiosService";

class TreinoService {
    private axiosService: any;

    constructor(private axiosServ: AxiosService) {
        this.axiosService = this.axiosServ.Criar();
    }

    async Listar(): Promise<any> {
        return this.axiosService.get('treino/listar');
    }
}

export default TreinoService;