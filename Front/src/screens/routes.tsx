import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import App from '../../App';
import Login from './login';
import Home from './home';
import Cadastro from './cadastro';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Login'>
                <Drawer.Screen name='Início' component={Home}/>
                <Drawer.Screen name='Login' options={{
                    headerShown: false,
                    drawerLabel: 'Sair'
                }}
                component={Login}/>
                <Drawer.Screen name='Cadastro' options={{
                    headerShown: false,
                    drawerLabel: () => null
                }}
                component={StackNavigator}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Stack'
                options={{
                    headerShown: false
                }}
                component={Cadastro}
            />
        </Stack.Navigator>
    )
}