import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import App from '../../App';
import Login from './login/login';
import Home from './home/home';

const Drawer = createDrawerNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='login'>
                <Drawer.Screen name='login' component={Login}/>
                <Drawer.Screen name='home' component={Home}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )   
}