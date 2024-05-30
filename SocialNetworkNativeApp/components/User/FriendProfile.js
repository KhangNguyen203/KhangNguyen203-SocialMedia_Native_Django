import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import MyContext from "../../configs/MyContext";
import API, { endpoints } from "../../configs/API";
import Style from "./Style";
import MyStyles from "../../styles/MyStyles";
import TabProfile from "../Tab/TabProfile";
import Friendstatus from "./Friendstatus";

const ProfileFriend = ({ route, navigation }) => {
  const [userr, setUserr] = useState(null);
  const [user,] = useContext(MyContext);
  const { userID } = route.params;


  useEffect(() => {
    // console.log("ProfileFriend ID user: " + userID);

    const loadUserOne = async () => {
      try {
        let res = await API.get(endpoints["users"](userID));
        setUserr(res.data);
      } catch (ex) {
        console.error(ex);
        setUserr(null);
      }
    };

    loadUserOne();
  }, [userID, user?.id]);


 

  const goToMess = async (user) =>{
    navigation.navigate('SingleChat', {receiver: user})
  }

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };

  return (
    <ScrollView>
      {userr === null ? 
        <ActivityIndicator /> 
      :(
        <View style={Style.containerProfile}>
          {userr.avatarCover === null? 
            <Image source={require('../../Images/avatar-cover.jpg')} style={Style.avatarCover} />
            // <Image source={require('../../Icons/facebook-logo.png')} style={styles.googleIcon}/>

          :(
            <Image source={{ uri: userr.avatarCover }} style={Style.avatarCover} />
          )}

          {userr.avatar === null? 
            <Image source={require('../../Images/avatar.png')} style={Style.avatar} />
          :(
            <Image source={{ uri: addCloudinaryDomain(userr.avatar) }} style={Style.avatar} />
          )}
            
          <Text style={Style.username}>{userr.last_name}</Text>
          <Text style={Style.status}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>

          <View style={MyStyles.row}>
            {user != null? 
              <Friendstatus userOneID = {user.id} userTwoID = {userr.id}/>
            : ""}

            <TouchableOpacity style={Style.buttonMess} onPress={() => goToMess(userr)}>
              <Text style={Style.buttonTextMess}>Nhắn tin</Text>
            </TouchableOpacity>
          </View>

          <TabProfile userID={userID}/>

        </View>
      )}
    </ScrollView>
  );
};

export default ProfileFriend;