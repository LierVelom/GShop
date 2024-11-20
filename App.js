import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import { enableScreens } from 'react-native-screens';
import { FontAwesome5 } from '@expo/vector-icons';
import { Home, Search, Heart, Inbox, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import CheckoutScreen from './screens/Checkout';
import ProductDetailsScreen from './screens/ProductDetails';
import FilterScreen from './screens/FilterScreen';
import ProductCart from './screens/ProductCart';
import PaymentScreen from './screens/PaymentScreen';

enableScreens();


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs({ route }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#06B6D4',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: { position: 'absolute', height: 60 },
        headerShown: false,
        animation: 'shift',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={() => <></>}
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="FavoriteTab"
        component={() => <></>}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="InboxTab"
        component={() => <></>}
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <Inbox size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={() => <></>}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="sign" component={SignUpScreen} />
        <Stack.Screen name="home" component={HomeTabs} />
        <Stack.Screen name="checkout" component={CheckoutScreen} />
        <Stack.Screen name="product" component={ProductDetailsScreen} />
        <Stack.Screen name="filter" component={FilterScreen} />
        <Stack.Screen name="product-cart" component={ProductCart} />
        <Stack.Screen name="payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}