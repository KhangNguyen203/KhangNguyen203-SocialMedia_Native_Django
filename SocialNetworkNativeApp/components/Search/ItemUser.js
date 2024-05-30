import React, { useContext } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MyContext from '../../configs/MyContext';


const ItemUser = ({ userr }) => {
  const [user] = useContext(MyContext);
  const navigation = useNavigation();

  const addCloudinaryDomain = (publicId) => {
      const cloudinaryDomain = 'res.cloudinary.com/dvebfxho2/';
      return `https://${cloudinaryDomain}${publicId}`;
  };

  const goToProfile = (userID) => {
      navigation.navigate("ProfileFriend", { userID });
  };

  const goToMyProfile = () => {
      navigation.navigate("MyProfile");
  };

  if (!userr || !userr.id) {
      return null; // Trả về null nếu giá trị 'userr' hoặc 'userr.id' là null
  }

  return (
      user === null? 
        <ActivityIndicator/>
      : (
        <TouchableOpacity style={styles.container} onPress={userr.id === user.id ? goToMyProfile : () => goToProfile(userr.id)}>
          <Image
              source={{ uri: addCloudinaryDomain(userr.avatar) }}
              style={styles.avatar}
          />
          <View style={styles.userInfo}>
              <Text style={styles.username}>{userr.last_name}</Text>
              <Text style={styles.email}>{userr.email}</Text>
          </View>
          <Ionicons name="arrow-forward" size={24} color="#000" />
        </TouchableOpacity>
      )
  );
};


export default ItemUser;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  arrowContainer: {
    marginLeft: 'auto',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});

