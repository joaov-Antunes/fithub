import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import App from '../../App';
import Login from './login/login';
import Home from './home/home';

const Drawer = createDrawerNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='sair'>
                <Drawer.Screen name='home' component={Home}/>
                <Drawer.Screen name='sair' options={{
                    headerShown: false
                }}
                component={Login}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )   
}