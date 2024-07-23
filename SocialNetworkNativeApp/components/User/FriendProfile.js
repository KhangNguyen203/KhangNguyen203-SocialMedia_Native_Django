import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import MyContext from "../../configs/MyContext";
import API, { endpoints } from "../../configs/API";
import Style from "./Style";
import MyStyles from "../../styles/MyStyles";
import TabProfile from "../Tab/TabProfile";
import Friendstatus from "./Friendstatus";
import { Modal } from "react-native";

const ProfileFriend = ({ route, navigation }) => {
  const [userr, setUserr] = useState(null);
  const [user,] = useContext(MyContext);
  const { userID } = route.params;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmation2, setShowConfirmation2] = useState(false);


  useEffect(() => {
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

  //Xử lý hiện ZoomImage
  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancel = () => {
      setShowConfirmation(false);
  };

  const handleDeleteConfirmation2 = () => {
    setShowConfirmation2(true);
  };

  const handleCancel2 = () => {
      setShowConfirmation2(false);
  };

  return (
    <ScrollView>
      {userr === null ? 
        <ActivityIndicator /> 
      :(
        <View style={Style.containerProfile}>
          {userr.avatarCover === null? 
            <TouchableOpacity onPress={handleDeleteConfirmation2} style={Style.avatarCover}>
              <Image source={require('../../Images/avatar-cover.jpg')} style={Style.avatarCover} />
              
              <Modal visible={showConfirmation2} animationType="fade" transparent style = {{ position: 'absolute',top: 0, bottom: 0, left: 0,right: 0}}>
                  <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center',alignItems: 'center'}}>
                      <View style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', width: '100%', overflow: 'hidden'}}>
                          <TouchableOpacity onPress={handleCancel2} style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 8, borderRadius: 20,zIndex: 1}}>
                              <Image source={require('../../Icons/delete-icon.png')} style={{height: 20, width: 20}} />
                          </TouchableOpacity>

                          <Image source={require('../../Images/avatar-cover.jpg')} style={{ width: '100%', height: '100%', resizeMode: 'contain'}} />
                      </View>
                  </View>
              </Modal>
            </TouchableOpacity> 
          :(
            <TouchableOpacity onPress={handleDeleteConfirmation2} style={Style.avatarCover}>
              <Image source={{ uri: userr.avatarCover }} style={Style.avatarCover} />
              
              <Modal visible={showConfirmation2} animationType="fade" transparent style = {{ position: 'absolute',top: 0, bottom: 0, left: 0,right: 0}}>
                  <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center',alignItems: 'center'}}>
                      <View style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', width: '100%', overflow: 'hidden'}}>
                          <TouchableOpacity onPress={handleCancel2} style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 8, borderRadius: 20,zIndex: 1}}>
                              <Image source={require('../../Icons/delete-icon.png')} style={{height: 20, width: 20}} />
                          </TouchableOpacity>

                          <Image source={{ uri: userr.avatarCover }} style={{ width: '100%', height: '100%', resizeMode: 'contain'}} />
                      </View>
                  </View>
              </Modal>
            </TouchableOpacity> 
          )}

          {userr.avatar === null? 
            <TouchableOpacity onPress={handleDeleteConfirmation}>
              <Image source={require('../../Images/avatar.png')} style={Style.avatar} />
              
              <Modal visible={showConfirmation} animationType="fade" transparent style = {{ position: 'absolute',top: 0, bottom: 0, left: 0,right: 0}}>
                  <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center',alignItems: 'center'}}>
                      <View style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', width: '100%', overflow: 'hidden'}}>
                          <TouchableOpacity onPress={handleCancel} style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 8, borderRadius: 20,zIndex: 1}}>
                              <Image source={require('../../Icons/delete-icon.png')} style={{height: 20, width: 20}} />
                          </TouchableOpacity>

                          <Image source={require('../../Images/avatar.png')} style={{ width: '100%', height: '100%', resizeMode: 'contain'}} />
                      </View>
                  </View>
              </Modal>
            </TouchableOpacity>  
          :(
            <TouchableOpacity onPress={handleDeleteConfirmation}>
              <Image source={{ uri: addCloudinaryDomain(userr.avatar) }} style={Style.avatar} />
              
              <Modal visible={showConfirmation} animationType="fade" transparent style = {{ position: 'absolute',top: 0, bottom: 0, left: 0,right: 0}}>
                  <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center',alignItems: 'center'}}>
                      <View style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', width: '100%', overflow: 'hidden'}}>
                          <TouchableOpacity onPress={handleCancel} style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 8, borderRadius: 20,zIndex: 1}}>
                              <Image source={require('../../Icons/delete-icon.png')} style={{height: 20, width: 20}} />
                          </TouchableOpacity>

                          <Image source={{ uri: addCloudinaryDomain(userr.avatar) }} style={{ width: '100%', height: '100%', resizeMode: 'contain'}} />
                      </View>
                  </View>
              </Modal>
            </TouchableOpacity>            
          )}
            
          <Text style={Style.username}>{userr.last_name}</Text>
          <Text style={Style.status}>Happiness is not by chance, but by choice.</Text>

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