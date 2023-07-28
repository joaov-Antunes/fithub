import axios, { AxiosInstance } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Utilitarios from "../utilitarios/Utilitarios";

class AxiosService {
  token: string | null = '';

  ObterToken() {
    Utilitarios.GetToken()
    .then(res => {
      this.token = res;
    })
  }

  constructor() {}

  public Criar() {
    this.ObterToken();
    const instance: AxiosInstance = axios.create({
      baseURL: 'http://26.214.130.64:3308/',
      headers: { authorization: 'Bearer ' + this.token },
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
    
    return instance;
  }
}

export default AxiosService;