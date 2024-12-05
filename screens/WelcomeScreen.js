import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { getToken, removeToken } from '../auth/AuthToken';
const HomeScreen=({ route, navigation })=>{
    
    return (
        <>
        <View style={styles.contailner}>
            <View style={styles.top_img}>
                <Image source={require('../img/anhtrangchukhongnen1.png')} style={styles.Image}/>
            </View>

            <View style={styles.bottom}>
                <Text style={styles.bottom_title}>GSHOP</Text>
                <Text style={{color:'#ffffff', fontSize:18}}></Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.buttonShadowLogin} 
                onPress={()=>{
                    navigation.navigate('login')
                }}>
                    <LinearGradient
                    colors={['#2A3A5A', '#00BCD4']}
                    start={{x:0, y:0}}
                    end={{x:1, y:0}}
                    style={{paddingVertical: 15, borderRadius:50, alignItems:'center'}}
                    >
                        <Text style={styles.footer_text_button}>LOGIN</Text>
                        
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonSignUp}
                    onPress={()=>{
                        navigation.navigate('sign')
                    }}
                >
                    
                    <Text style={styles.footer_text_button}>SIGN UP</Text>
                        
                </TouchableOpacity>
            </View>

        </View>
        </>
    );
}

const styles = StyleSheet.create({
    contailner:{
        flex:1,
        backgroundColor: '#576CD6',
    },
    top_img:{
        flex:1,
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Image:{
        height: '100%',
        width: '100%',
        resizeMode: 'contain'

    },
    bottom:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    bottom_title:{
        fontSize:30,
        fontWeight:'800',
        color:'#ffffff',
    },
    footer:{
        flex:1,
        paddingHorizontal: 40,
    },
    footer_text_button:{
        color:'#ffffff',
        fontWeight:'bold',
        fontSize: 20
    },
    buttonShadowLogin: {
        elevation: 10, // Đổ bóng cho Android
        borderRadius: 50, // Đảm bảo nút bo tròn
    },
    buttonSignUp:{
        borderRadius: 50,
        borderWidth:2,
        borderColor: '#000000',
        paddingVertical: 13, 
        borderRadius:50, 
        alignItems:'center',
        marginTop:20
    }
})

export default HomeScreen;