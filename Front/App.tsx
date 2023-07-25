import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/login/login';
import Routes from './src/screens/routes';
import Home from './src/screens/home/home';

export default function App({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Login navigation={navigation}></Login>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
});
