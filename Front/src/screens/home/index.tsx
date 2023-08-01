import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import TreinoService from "../../services/treinoService";
import AxiosService from "../../services/axiosService";
import { CommonActions } from '@react-navigation/native'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }: any ) {
    const [treinos, setTreinos] = useState<Array<any>>([]);

    const axiosService = new AxiosService();
    const treinoService = new TreinoService(axiosService);

    useEffect(() => {
        treinoService.Listar()
        .then(res => {
            setTreinos(res.data);

            () => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{name: 'Início'}]
                    })
                );
            }
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const Logout = () => {
        AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            {treinos.map((n: any)=> <Text style={{color: '#fff'}} key={n.Id}>{ n.UsuarioId }</Text> )}
            <TouchableOpacity>
                <Text onPress={() => Logout()}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}
