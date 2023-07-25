import AsyncStorage from "@react-native-async-storage/async-storage";

class Utilitarios {
    constructor() {}

    static async GravarToken(token: string): Promise<void> {
        await AsyncStorage.setItem('token', token);
    }

    static async GetToken(): Promise<string | null> { 
        return await AsyncStorage.getItem('token');
    }
}

export default Utilitarios;