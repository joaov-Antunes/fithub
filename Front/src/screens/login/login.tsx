import { Text, TouchableOpacity, View, Image, TextInput } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import UsuarioService from "../../services/usuarioService";
import AxiosService from "../../services/axiosService";
import AutenticacaoService from "../../services/autenticacaoService";
import Utilitarios from "../../utilitarios/Utilitarios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }: any) {
    useEffect(() => {
        AsyncStorage.clear();
    }, []);

    const [Nome, setNome] = useState('');
    const [Email, setEmail] = useState('');
    const [Senha, setSenha] = useState('');
    const [ConfSenha, setConfSenha] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senhaLogin, setSenhaLogin] =useState('');

    const [avisoNome, setAvisoNome] = useState(false);
    const [avisoEmail, setAvisoEmail] = useState(false);
    const [avisoSenha, setAvisoSenha] = useState(false);
    const [avisoConfsenha, setAvisoConfsenha] = useState(false);

    const [avisoLogin, setAvisoLogin] = useState(false);

    const axiosService: AxiosService = new AxiosService();

    const usuarioService: UsuarioService = new UsuarioService(axiosService);
    const autenticacaoService: AutenticacaoService = new AutenticacaoService(axiosService);

    const registroCadastro: Object = {
        Nome: Nome,
        Email: Email,
        Senha: ConfSenha,
    }

    const registroLogin: Object = {
        Email: usuario,
        Senha: senhaLogin
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
            console.log(res);
        }
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
            navigation.navigate('home');
            return;
        })
        .catch(err => {
            setAvisoLogin(true);
        });
    }

    return (
        <View style={styles.container}>
            <Image style ={styles.logo} source={require('../../../assets/logo.png')}/>
            <Text style={styles.text}>Insira os dados de acesso</Text>
            <TextInput style={styles.input} placeholderTextColor={'#fff'} placeholder="Email" onChangeText={text => setUsuario(text)}/>
            <TextInput style={styles.input} placeholderTextColor={'#fff'} placeholder={"Senha"} onChangeText={text => setSenhaLogin(text)}/>
            <Text style={[styles.aviso, avisoLogin ? {display: 'flex'} : {display:'none'}]}>Usuário ou senha incorretos</Text>
            
            <TouchableOpacity style={styles.button} onPress={async() => await Autenticar()}>
                <Text style={styles.btnText}>ENTRAR</Text>
            </TouchableOpacity>

            <Text style={styles.text}>OU</Text>
            <Text style={[styles.text, styles.cadastroText]}>Cadastre-se</Text>
            <TextInput style={styles.input} placeholderTextColor={'#fff'} placeholder="Nome" onChangeText={text => setNome(text)}/>
            <Text style={[styles.aviso, avisoNome ? {display: 'flex'} : {display:'none'}]}>* Este campo é obrigatório</Text>
            <TextInput style={styles.input} placeholderTextColor={'#fff'} placeholder="email" onChangeText={text => setEmail(text)}/>
            <Text style={[styles.aviso, avisoEmail? {display: 'flex'} : {display:'none'}]}>* Este campo é obrigatório</Text>
            <TextInput style={styles.input} placeholderTextColor={'#fff'} placeholder="Senha" onChangeText={text => setConfSenha(text)}/>
            <Text style={[styles.aviso, avisoConfsenha ? {display: 'flex'} : {display:'none'}]}>* Este campo é obrigatório</Text>
            <TextInput style={styles.input} placeholderTextColor={'#fff'} placeholder="Confirmação de senha" onChangeText={text => setSenha(text)}/>
            <Text style={[styles.aviso, avisoSenha ? {display: 'flex'} : {display:'none'}]}>* Este campo é obrigatório</Text>

            <TouchableOpacity style={styles.button} onPress={async () => await Gravar()}>
                <Text style={styles.btnText}>CADASTRAR</Text>
            </TouchableOpacity>
        </View>
    );
}