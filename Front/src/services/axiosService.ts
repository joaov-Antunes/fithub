import axios, { AxiosInstance } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Utilitarios from "../utilitarios/Utilitarios";

class AxiosService {
  token: string | null = '';
  
  async ObterToken(): Promise<string | null> {
    this.token = await Utilitarios.GetToken()

    return this.token;
  }

  constructor() {}

  public Criar() {
    const instance: AxiosInstance = axios.create({
      baseURL: 'http://26.214.130.64:3308/',
      headers: {
        "Content-Type": 'application/json',
       },
      validateStatus: status => {
        if(status==401)
        {
          return false;
        }

        if(status == 200 || status == 201)
          return true;

        return false
        }
    });

    instance.interceptors.request.use(async (config) => {
      await this.ObterToken();
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });
    
    return instance;
  }
  
}

export default AxiosService;