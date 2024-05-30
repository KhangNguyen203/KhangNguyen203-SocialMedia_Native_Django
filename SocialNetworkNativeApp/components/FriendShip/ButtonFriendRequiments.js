import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons  } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



const ButtonFriendRequiments = () => {
    const navigation = useNavigation();

    const goToListFriendShip = async () => {
        navigation.navigate('FriendShip');
    }

    return (
        <TouchableOpacity style={styles.iconContainer} onPress={goToListFriendShip}>
            <Feather name="users" size={40} color="black" />
        </TouchableOpacity>
    );
}

export default ButtonFriendRequiments;

const styles = StyleSheet.create({
    iconContainer: {
      width: 60, // Đảm bảo kích thước của container lớn hơn kích thước của biểu tượng
      height: 60,
      borderRadius: 30, // Chia đôi kích thước để có viền hình tròn
      borderWidth: 1, // Độ dày của viền
      borderColor: 'white', // Màu sắc của viền
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9933CC',
    },
  });