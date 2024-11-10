import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient';


const SignUpScreen = ({ route, navigation }) => {
    return (
        <View style={styles.contailner}>
            <ScrollView style={{ flex: 1}}>
                <View style={styles.header_image}>
                    <LinearGradient
                        colors={['#ffffff', '#576CD6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ alignItems: 'center' }}
                    >
                        <Image
                            source={require('../img/anhSignUp.png')}
                            style={styles.image}
                        />

                    </LinearGradient>

                </View>
                <View style={styles.mainInput}>
                    <View style={styles.mainInput_title}>
                        <Text style={styles.textWelcome}>REGISTER</Text>
                        <Text style={{ color: '#ffffff', fontSize: 18 }}>Create your account</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'space-around' }}>
                        {/** UserName*/}
                        <LinearGradient
                            colors={['#C3CBF0', '#8999E3']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.5, y: 0 }}
                            style={{ paddingVertical: 20, paddingRight: 200, paddingLeft: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 20, marginBottom: 15 }}
                        >
                            <Icon name='user' size={20} color={'#285CA3'} />
                            <TextInput
                                placeholder='Usename'
                                style={styles.textInput}
                                placeholderTextColor='#285CA3'
                            />

                        </LinearGradient>
                        {/** Email Address*/}
                        <LinearGradient
                            colors={['#C3CBF0', '#8999E3']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.5, y: 0 }}
                            style={{ paddingVertical: 20, paddingRight: 200, paddingLeft: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 20, marginBottom: 15 }}
                        >
                            <Icon name='user' size={20} color={'#285CA3'} />
                            <TextInput
                                placeholder='Email address'
                                style={styles.textInput}
                                placeholderTextColor='#285CA3'
                            />

                        </LinearGradient>
                        {/**Password */}
                        <LinearGradient
                            colors={['#C3CBF0', '#8999E3']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.5, y: 0 }}
                            style={{ paddingVertical: 20, paddingRight: 200, paddingLeft: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 20, marginBottom: 15 }}
                        >
                            <Icon name='lock' size={20} color={'#285CA3'} />
                            <TextInput
                                placeholder='Password'
                                style={styles.textInput}
                                placeholderTextColor='#285CA3'
                            />

                        </LinearGradient>
                        {/** Confirm Password*/}
                        <LinearGradient
                            colors={['#C3CBF0', '#8999E3']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0.5, y: 0 }}
                            style={{ paddingVertical: 20, paddingRight: 100, paddingLeft: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 20, marginBottom: 15 }}
                        >
                            <Icon name='user' size={20} color={'#285CA3'} />
                            <TextInput
                                placeholder='Confirm password'
                                style={styles.textInput}
                                placeholderTextColor='#285CA3'
                            />

                        </LinearGradient>
                        <View >
                            <TouchableOpacity >
                                <Text style={{ color: '#ffffff', fontSize: 16 }}>
                                    By registering, you are agreeing to our Terms of use and Privacy Policy
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.buttonShadowLogin}>
                        <LinearGradient
                            colors={['#2A3A5A', '#2E599F']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ paddingVertical: 15, borderRadius: 50, alignItems: 'center' }}
                        >
                            <Text style={styles.footer_text_button}>REGISTER</Text>

                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                        <Text style={{ color: '#ffffff', fontSize: 18 }}>Already have an account? </Text>
                        <Text
                            onPress={() => {
                                navigation.navigate('login')
                            }}
                            style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline' }}
                        >
                            Login
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );

}

const styles = StyleSheet.create({
    contailner: {
        flex: 1.5,
        backgroundColor: '#576CD6',
    },
    header_image: {
        flex: 1.5,
        backgroundColor: '#ffffff'
    },
    image: {
        marginTop: 15,
        height: 300,
        width: 300,
        resizeMode: 'contain'
    },
    mainInput: {
        flex: 3,
        paddingVertical: 15,
        alignItems: 'center',
        paddingHorizontal: 40
    },
    mainInput_title: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: "space-around",
        marginBottom: 10
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

export default SignUpScreen;