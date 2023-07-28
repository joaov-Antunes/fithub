import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import { useEffect } from "react";
import TreinoService from "../../services/treinoService";
import AxiosService from "../../services/axiosService";
import Utilitarios from "../../utilitarios/Utilitarios";

export default function Home() {
    let treinos: Array<any> = [];

    const axiosService = new AxiosService();
    const treinoService = new TreinoService(axiosService);

    useEffect(() => {
        treinoService.Listar()
        .then(res => {
            console.log(res.data);
            treinos = res.data;
        })
        .catch( async err => {
            console.log(err);
        });
    })

    return (
        <View style={styles.container}>
            {treinos.map(n => <Text style={{color: '#fff'}}>{ n.UsuarioId }</Text> )}
            
        </View>
    )
}
