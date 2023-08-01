import { Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import UsuarioService from "../../services/usuarioService";
import AxiosService from "../../services/axiosService";
import AutenticacaoService from "../../services/autenticacaoService";
import Utilitarios from "../../utilitarios/Utilitarios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CommonActions } from '@react-navigation/native'

export default function Cadastro({ navigation }: any) {
    useEffect(() => {
        async () => {
            if(await Utilitarios.GetToken() !== null) {
                navigation.navigate('Início');
            };

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Login'}]
                })
            );
        }
    }, []);

    const [Nome, setNome] = useState('');
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [ConfSenha, setConfSenha] = useState('');

    const [avisoNome, setAvisoNome] = useState(false);
    const [avisoEmail, setAvisoEmail] = useState(false);
    const [avisoSenha, setAvisoSenha] = useState(false);
    const [avisoConfsenha, setAvisoConfsenha] = useState(false);

    const axiosService: AxiosService = new AxiosService();

    const usuarioService: UsuarioService = new UsuarioService(axiosService);

    const registroCadastro: Object = {
        Nome: Nome,
        Email: Email,
        Senha: ConfSenha,
    }

    const Gravar = async (): Promise<void> => {
        if(!Nome) {
            setAvisoNome(true);
            return;
        }

        if(!Email) {
            setAvisoEmail(true);
            return;
        }

        if(!Senha) {
            setAvisoConfsenha(true);
            return;
        }

        if(!ConfSenha) {
            setAvisoSenha(true);
            return;
        }
        
        if(Senha == ConfSenha) {
            const res = await usuarioService.Cadastrar(registroCadastro);
        }
    }

    return (
        <View style={styles.container}>

            <Text style={styles.text}>OU</Text>
            <Text style={[styles.text, styles.cadastroText]}>Cadastre-se</Text>
            <TextInput style={styles.input} placeholderTextColor={'#fff'} placeholder="Nome" onChangeText={text => setNome(text)}/>
            <Text style={[styles.aviso, avisoNome ? {display: 'flex'} : {display:'none'}]}>* Este campo é obrigatório</Text>
            <TextInput style={styles.input} placeholderTextColor={'#fff'} placeholder="email" onChangeText={text => setEmail(text)}/>
            <Text style={[styles.aviso, avisoEmail? {display: 'flex'} : {display:'none'}]}>* Este campo é obrigatório</Text>
            <TextInput secureTextEntry={true} style={styles.input} placeholderTextColor={'#fff'} placeholder="Senha" onChangeText={text => setConfSenha(text)}/>
            <Text style={[styles.aviso, avisoConfsenha ? {display: 'flex'} : {display:'none'}]}>* Este campo é obrigatório</Text>
            <TextInput secureTextEntry={true} style={styles.input} placeholderTextColor={'#fff'} placeholder="Confirmação de senha" onChangeText={text => setSenha(text)}/>
            <Text style={[styles.aviso, avisoSenha ? {display: 'flex'} : {display:'none'}]}>* Este campo é obrigatório</Text>

            <TouchableOpacity style={styles.button} onPress={async () => await Gravar()}>
                <Text style={styles.btnText}>CADASTRAR</Text>
            </TouchableOpacity>
            
        </View>
    );
}