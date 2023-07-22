import { Usuario } from "../models/entities/Usuario"

export interface AutenticacaoDTO {
    Email: string,
    Senha: string
}

export interface AutenticacaoRetornoDTO {
    usuario: Usuario,
    access_token: string
}