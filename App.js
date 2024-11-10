import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeProduct from './screens/HomeProduct';
import { enableScreens } from 'react-native-screens';
import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import CheckoutScreen from './screens/Checkout';
import ProductDetailsScreen from './screens/ProductDetails';

enableScreens();


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs({ route }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2E599F',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: { position: 'absolute', height: 60 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeProduct}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="HomeTab2"
        component={CheckoutScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="HomeTab3"
        component={ProductDetailsScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="sign" component={SignUpScreen} />
        <Stack.Screen name="homeProduct" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}