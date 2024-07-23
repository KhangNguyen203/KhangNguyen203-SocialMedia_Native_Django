import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ActivityIndicator, Image } from "react-native";
import { TouchableOpacity, Alert } from "react-native";
import MyStyles from "../../styles/MyStyles";
import Style from "./Style";
import * as ImagePicker from 'expo-image-picker';
import API, { endpoints } from "../../configs/API";
import {ref, set} from 'firebase/database'; 
import { db } from '../../configs/FirebaseConfig';
import SimpleToast from 'react-native-simple-toast';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


const Register = ({navigation}) => {
    const [loading, setLoading] = useState(false);
    const [password2, setPassword2] = useState("");
    const [emailExists, setEmailExists] = useState(null);
    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "username": "",
        "password": "",
        "avatar": "",
        "email": "",
        "userRole": "1",
    });

    useEffect(() => {
        getEmailExists();
    }, [emailExists]);

    const register= async () => { 
        change("username", user.email);
        await getEmailExists();

        if (!ValidCheck())
            return

        setLoading(true);
        const form = new FormData();
        for (let key in user)
            if (key === 'avatar') {
                form.append(key, {
                    uri: user[key].uri,
                    name: user[key].fileName,
                    type: "image/jpeg"
                })
            } else
                form.append(key, user[key]);
                
    
        try {
            let res = await API.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Đặt lại giá trị trống cho các trường người dùng
            setUser({
                first_name: "",
                last_name: "",
                username: "",
                password: "",
                avatar: "",
                email: "",
                userRole: "1",
            });
            setPassword2("");

            SimpleToast.show("Đăng ký tài khoản thành công");
            navigation.navigate("Login");

        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    const getEmailExists = async () => {
        try {
            const res = await API.get(endpoints['get_user_by_email'](user.email));
            setEmailExists(res.data);
        } catch (error) {
            // console.error(error);
        }
    };

    const ValidCheck = () => {
        if (user.email === "" || user.last_name === ""|| user.password === ""|| password2 === "") {
            SimpleToast.show("Vui lòng điền đầy đủ thông tin!")
            return false;
        }

        // Kiểm tra địa chỉ email
        const emailRegex = /^[\w-.]+@ou\.edu\.vn$/;
        if (!emailRegex.test(user.email)) {
            SimpleToast.show("Điền email định dạng @ou.edu.vn!");
            return false;
        }

        if (user.password !== password2){
            SimpleToast.show("Mật khẩu xác nhận không khớp!");
            return false;
        }

        if (user.avatar === ""){
            SimpleToast.show("Vui lòng chọn avatar!");
            return false;
        }

        if (emailExists.length !== 0){
            SimpleToast.show("Địa chỉ email đã tồn tại!");
            return false;
        }

        return true;
    } 

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
        if (status !== 'granted') {
            alert("Permission Denied!");
        } else {
            let res = await ImagePicker.launchImageLibraryAsync();
            if (!res.canceled) {
                change("avatar", res.assets[0]);
                change("username", user.email);
                console.log(user);
            }
        }
    };

    const change = (field, value) => {
        setUser(current => {
            return {...current, [field]: value};
        });
    };

    const goBack =()=> {
        navigation.navigate("Login");
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
        
            <Text style={styles.title}>Tạo tài khoản</Text>
        
            <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#4287f5" style={styles.icon} />
                <TextInput
                value={user.last_name}
                onChangeText={(t) => change("last_name", t)}
                style={styles.input}
                placeholder="Tên đăng nhập"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#4287f5" style={styles.icon} />
                <TextInput
                value={user.email}
                onChangeText={(t) => change("email", t)}
                style={styles.input}
                placeholder="Email sinh viên"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#4287f5" style={styles.icon} />
                <TextInput
                value={user.password}
                onChangeText={(t) => change("password", t)}
                style={styles.input}
                placeholder="Mật khẩu"
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#4287f5" style={styles.icon} />
                <TextInput
                value = {password2}
                onChangeText={(t) => setPassword2(t)}
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                />
            </View>
            </View>
        
            <View style={styles.avatarContainer}>
                {user.avatar ? (
                    <Image style={styles.avatar} source={{ uri: user.avatar.uri }} />
                ) : 
                    <Image source={require('../../Images/avatar.png')} style={styles.avatar}/>
                }
        
                <TouchableOpacity style={styles.cameraButton} onPress={picker}>
                    <Image source={require('../../Icons/camera-icon.png')} style={styles.cameraIcon}/>
                </TouchableOpacity>
            </View>
        
            {loading ? (
            <ActivityIndicator style={styles.loading} />
            ) : (
            <TouchableOpacity onPress={register} style={styles.button}>
                <Text style={styles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 70,
      paddingHorizontal: 20,
      backgroundColor: '#EEEEEE',
    },
    backButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      paddingHorizontal: 10,
      paddingVertical: 5,
      zIndex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    formContainer: {
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 15,
      borderColor: '#ccc',
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 40,
    },
    avatarContainer: {
      left: 100,
      flexDirection: "row",
      marginBottom: 30,
    },
    avatar: {
      width: 150,
      height: 200,
      borderRadius: 10,
    //   marginBottom: 10,
    },
    cameraButton: {
      marginTop: 150,
      top:20,
      left: -25,
      padding: 10,
      borderRadius: 30,
      backgroundColor: '#191970',
    },
    cameraIcon: {
      width: 30,
      height: 30,
    },
    button: {
      backgroundColor: '#4287f5',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    loading: {
      marginTop: 10,
    },
  });

export default Register;