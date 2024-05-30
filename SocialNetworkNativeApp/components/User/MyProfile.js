import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import MyContext from "../../configs/MyContext";
import Style from "./Style";
import TabProfile from "../Tab/TabProfile";
import { LOCALHOST } from '../../configs/Constant';
import MyStyles from "../../styles/MyStyles";

const Profile = () => {
  const [user,] = useContext(MyContext);

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };

  if (!user) {
    // Render a loading state or handle the case where user is null
    return (
      <View style={MyStyles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={MyStyles.container}>
      <ScrollView>
        <View style={Style.containerProfile}>
          {user.avatarCover === null? 
            <Image source={require('../../Images/avatar-cover.jpg')} style={Style.avatarCover} />
            // <Image source={require('../../Icons/facebook-logo.png')} style={styles.googleIcon}/>

          :(
            <Image source={{ uri: LOCALHOST+ user.avatarCover }} style={Style.avatarCover} />
          )}

          {user.avatar === null? 
            <Image source={require('../../Images/avatar.png')} style={Style.avatar} />
          :(
            <Image source={{ uri: addCloudinaryDomain(user.avatar) }} style={Style.avatar} />
          )}

          <Text style={Style.username}>{user.last_name}</Text>
          <Text style={{margin: 3, marginTop: -10, marginBottom: 5, color: "#777777"}}>({user.email})</Text>
          <Text style={[Style.status, {marginBottom: 3}]}>Happiness is not by chance, but by choice.</Text>

          <TabProfile userID={user.id} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;