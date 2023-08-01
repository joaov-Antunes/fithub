import { Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import UsuarioService from "../../services/usuarioService";
import AxiosService from "../../services/axiosService";
import AutenticacaoService from "../../services/autenticacaoService";
import Utilitarios from "../../utilitarios/Utilitarios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CommonActions } from '@react-navigation/native'

export default function Login({ navigation }: any) {
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

    const [usuario, setUsuario] = useState('');
    const [senhaLogin, setSenhaLogin] =useState('');

    const [avisoLogin, setAvisoLogin] = useState(false);

    const axiosService: AxiosService = new AxiosService();

    const autenticacaoService: AutenticacaoService = new AutenticacaoService(axiosService);

    const registroLogin: Object = {
        Email: usuario,
        Senha: senhaLogin
    }


    const Autenticar = async (): Promise<void> => {
        if(!usuario) {
            return;
        }

        if(!senhaLogin) {
            return;
        }

        await autenticacaoService.Autenticar(registroLogin)
        .then(async res => {
            await Utilitarios.GravarToken(res.data.access_token);
            setAvisoLogin(false);
            navigation.navigate('Início');
            return;
        })
        .catch(err => {
            setAvisoLogin(true);
        });
    }

    const AbrirCadastro = () => {
        navigation.navigate('Cadastro')
    }

    return (
        <View style={styles.container}>
            <Image style ={styles.logo} source={require('../../../assets/logo.png')}/>
            <Text style={styles.text}>Insira os dados de acesso</Text>
            <TextInput style={styles.input} placeholderTextColor={'#fff'} placeholder="Email" onChangeText={text => setUsuario(text)}/>
            <TextInput secureTextEntry={true} style={styles.input} placeholderTextColor={'#fff'} placeholder={"Senha"} onChangeText={text => setSenhaLogin(text)}/>
            <Text style={[styles.aviso, avisoLogin ? {display: 'flex'} : {display:'none'}]}>Usuário ou senha incorretos</Text>
            
            
                <Text>Não possui cadastro? <TouchableOpacity onPress={() => AbrirCadastro()}><Text>clique aqui</Text></TouchableOpacity></Text>

            <TouchableOpacity style={styles.button} onPress={async() => await Autenticar()}>
                <Text style={styles.btnText}>ENTRAR</Text>
            </TouchableOpacity>
        </View>
    );
}