import { StatusBar } from 'expo-status-bar';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/login/login';
import Routes from './src/screens/routes';
import Home from './src/screens/home/home';
import { expo } from './app.json';

const appName = expo.name;

export default function App({ navigation }: any) {
  return (
      <Routes/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent(appName, () => App);
