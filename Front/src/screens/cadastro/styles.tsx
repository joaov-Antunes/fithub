import { StyleSheet } from "react-native";

const orange: string = '#EF8F00';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        marginTop: 32,
        width: 200,
        height: 54,
        alignSelf: 'center'
    },
    text: {
        fontSize: 24,
        color: '#fff',
        marginTop: 32,
        textAlign: 'center'
    },
    input: {
        borderBottomWidth: 2,
        borderRadius: 5,
        borderBottomColor: orange,
        width: 300,
        height: 47,
        paddingLeft: 5,
        paddingHorizontal: 0,
        color: '#fff'
    },
    button: {
        width: 200,
        height: 40,
        backgroundColor: orange,
        borderRadius: 5,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    aviso: {
        color: '#ff0000',
    },
    cadastroText: {
        marginBottom: 30
    }
});

export default styles;