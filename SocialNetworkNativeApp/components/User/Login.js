const { View, Text, TextInput, ActivityIndicator, TouchableOpacity, Alert, Image, StyleSheet } = require("react-native")
import { useContext, useState } from "react";
import MyStyles from "../../styles/MyStyles"
import Style from "./Style"
import API, { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyContext from "../../configs/MyContext";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UpdatingFunction } from "../../configs/Constant";
import SimpleToast from 'react-native-simple-toast';



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, dispatch] = useContext(MyContext);
    const navigation = useNavigation();


    const login = async () => {
        if (!ValidCheck())
            return

        setLoading(true);
        
        try {
            let reqData = {
                "username": username,
                "password": password,
                "client_id": "8VhKnXBMmFDhyVt3o7peXoOLFxofArg7Q4cuVfBO",
                "client_secret": "JQ7lzYC7jjoFmtfMC053lBbVWx8LZo3GWdrIrXF5Pn0JXuBEVhtxfzJlwSzEuePl6VK6gepGqBSWbCjn55bZWTLWnSjpo01TGWotwZEGVQkPG4MSeoVYNnk9DGFwUO7X",
                "grant_type": "password",
                "withCredentials": "true"
            }
            data = Object.keys(reqData).map(function(key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key])
            }).join('&')

            let res = await API.post(endpoints["login"], data);
            await AsyncStorage.setItem("access-token", res.data.access_token)

            let user = await authApi(res.data.access_token).get(endpoints['current-user'])

            dispatch({
                "type": "login",
                "payload": user.data
            });

            navigation.navigate('Home');
        } catch (ex) {
            // console.error(ex)
            Alert.alert("Thông báo","Thông tin đăng nhập không chính xác!");
        }finally {
            setLoading(false);
        }

    } 

    const ValidCheck = () => {
        if (username === "" || password === "") {
            SimpleToast.show("Vui lòng điền đầy đủ thông tin!")
            return false;
        }

        // Kiểm tra địa chỉ email
        const emailRegex = /^[\w-.]+@ou\.edu\.vn$/;
        if (!emailRegex.test(username)) {
            SimpleToast.show("Điền email định dạng @ou.edu.vn!");
            return false;
        }

        return true;
    } 

    const gtRegister = () => {
        navigation.navigate("Register")
    }
    
    return (
        <View style={styles.container}>
            <Image
                source={require('../../Images/OU-logo.png')}
                style={styles.logo}
            />
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#4287f5" style={styles.icon} />
                    <TextInput
                        value={username}
                        onChangeText={(t) => setUsername(t)}
                        style={styles.input}
                        placeholder="Email sinh viên"
                    />
                </View>

                
                <View style={styles.inputContainer}>
                    <Icon
                        name="lock"
                        size={20}
                        color="#4287f5"
                        style={styles.icon}
                    />
                    <TextInput
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(t) => setPassword(t)}
                        style={styles.input}
                        placeholder="Mật khẩu"
                    />
                </View>

            {loading === true ? (
                <ActivityIndicator style={styles.loading} />
            ) : (
                <TouchableOpacity onPress={login} style={styles.button}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
            )}
            </View>

            <TouchableOpacity style={{marginBottom: 30}} onPress={UpdatingFunction}>
            <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <View>
                <TouchableOpacity style={styles.googleButton} onPress={UpdatingFunction}>
                    <Image source={require('../../Icons/facebook-logo.png')} style={styles.googleIcon}/>
                    <Text style={styles.googleText}>Sign In with Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.googleButton} onPress={UpdatingFunction}>
                    <Image source={require('../../Icons/google-logo.png')} style={styles.googleIcon}/>
                    <Text style={[styles.googleText, {color: "#FF4500"}]}>Sign In with Google</Text>
                </TouchableOpacity>
        
                <TouchableOpacity onPress={gtRegister}>
                    <Text style={styles.signupText}>Chưa có tài khoản? Tạo ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
  
    );
}

export default Login


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EEEEEE',
    },
    logo: {
      height: 250,
      width: 300,
      marginBottom: -30,
    },
    formContainer: {
      marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
    },
    button: {
      backgroundColor: '#4287f5',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    forgotPassword: {
      color: '#4287f5',
      marginBottom: 10,
    },
    googleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      backgroundColor: "#CFCFCF", 
      padding: 5, 
      borderRadius: 10,

    },
    googleIcon: {
      height: 30,
      width: 30,
      marginRight: 10,
      marginRight: 30
    },
    googleText: {
      fontWeight: 'bold',
      color: '#4287f5',
      marginRight: 50,
    },
    signupText: {
        marginTop: 20,
      left: 30,
      color: '#4287f5',
    },
    loading: {
      marginTop: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 15,
      borderColor: '#ccc',
      width: 280,
    },
    icon: {
     marginRight: 10,
    },
  });