import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { saveToken, removeToken, getToken } from '../auth/AuthToken';
import { postAPI } from '../auth/ActionAPI';

const LoginScreen = ({ route, navigation }) => {

    const [login, setLogin] = useState('1234567890');
    const [password, setPassword] = useState('password');

    // React.useEffect(() => {
    //     if(getToken() !== null) {
    //         navigation.navigate('home');
    //     }
    // }, []);

    const handleLogin = async () => {
        try {
            const response = await postAPI('login', {
                login: login,
                password: password
            });

            const data = await response;

            if (response !== null) {
                // Lưu token vào AsyncStorage
                await saveToken(data.access_token);
                
                navigation.navigate('home');
            } else {
                Alert.alert('Login Failed', data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'Failed to login!');
        }
    }

    return (
        <View style={styles.contailner}>
            <View style={styles.header_image}>
                <Image
                    source={require('../img/anhLogin.jpg')}
                    style={styles.image}
                />
            </View>

            <View style={styles.mainInput}>
                <View style={styles.mainInput_title}>
                    <Text style={styles.textWelcome}>WELCOME BACK</Text>
                    <Text style={{ color: '#ffffff', fontSize: 18 }}>Login to your account</Text>
                </View>

                <View style={{ flex: 2, justifyContent: 'space-around' }}>
                    <LinearGradient
                        colors={['#C3CBF0', '#8999E3']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.5, y: 0 }}
                        style={{ paddingVertical: 20, paddingRight: 200, paddingLeft: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 20 }}
                    >
                        <Icon name='user' size={20} color={'#285CA3'} />
                        <TextInput
                            placeholder='Email or phone number'
                            style={styles.textInput}
                            placeholderTextColor='#285CA3'
                            onChangeText={setLogin}
                            value={'1234567890'}
                        />

                    </LinearGradient>

                    <LinearGradient
                        colors={['#C3CBF0', '#8999E3']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.5, y: 0 }}
                        style={{ paddingVertical: 20, paddingRight: 200, paddingLeft: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 20 }}
                    >
                        <Icon name='lock' size={20} color={'#285CA3'} />
                        <TextInput
                            placeholder='Password'
                            style={styles.textInput}
                            placeholderTextColor='#285CA3'
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            value={'password'}
                        />

                    </LinearGradient>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ width: 150 }}>
                            <Text style={{ color: '#ffffff', fontSize: 16 }}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.buttonShadowLogin}
                    onPress={() => {
                        handleLogin();
                    }}
                >
                    <LinearGradient
                        colors={['#2A3A5A', '#06B6D4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ paddingVertical: 15, borderRadius: 50, alignItems: 'center' }}
                    >
                        <Text style={styles.footer_text_button}>LOGIN</Text>

                    </LinearGradient>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ color: '#ffffff', fontSize: 18 }}>Don't have an account? </Text>
                    <Text
                        onPress={() => {
                            navigation.navigate('sign')
                        }}
                        style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                    >
                        Sign up
                    </Text>
                </View>
            </View>
        </View>
    );

}
const styles = StyleSheet.create({
    contailner: {
        flex: 1,
        backgroundColor: '#576CD6',
    },
    header_image: {
        flex: 2,
        backgroundColor: '#000000',
        borderTopLeftRadius: 0, // Không cong góc trên trái
        borderTopRightRadius: 0, // Không cong góc trên phải
        borderBottomLeftRadius: 200, // Cong góc dưới trái
        borderBottomRightRadius: 200, // Cong góc dưới phải
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    mainInput: {
        flex: 2,
        paddingVertical: 15,
        alignItems: 'center',
    },
    mainInput_title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-around"
    },
    textWelcome: {
        fontSize: 30,
        fontWeight: '800',
        color: '#ffffff',
    },
    textInput: {
        color: '#ffffff',
        fontSize: 20,
        marginLeft: 10,
    },
    footer: {
        flex: 1,
        paddingHorizontal: 40,
    },
    buttonShadowLogin: {
        elevation: 10, // Đổ bóng cho Android
        borderRadius: 50, // Đảm bảo nút bo tròn
    },
    footer_text_button: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20
    },
})

export default LoginScreen;