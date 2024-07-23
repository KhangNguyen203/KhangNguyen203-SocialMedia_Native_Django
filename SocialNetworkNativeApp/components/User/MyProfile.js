import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import MyContext from "../../configs/MyContext";
import Style from "./Style";
import TabProfile from "../Tab/TabProfile";
import { LOCALHOST } from '../../configs/Constant';
import MyStyles from "../../styles/MyStyles";

const Profile = () => {
  const [user,] = useContext(MyContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmation2, setShowConfirmation2] = useState(false);

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
  //============

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
              <Image source={{ uri: LOCALHOST+ user.avatarCover }} style={Style.avatarCover} />
              
              <Modal visible={showConfirmation2} animationType="fade" transparent style = {{ position: 'absolute',top: 0, bottom: 0, left: 0,right: 0}}>
                  <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center',alignItems: 'center'}}>
                      <View style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', width: '100%', overflow: 'hidden'}}>
                          <TouchableOpacity onPress={handleCancel2} style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 8, borderRadius: 20,zIndex: 1}}>
                              <Image source={require('../../Icons/delete-icon.png')} style={{height: 20, width: 20}} />
                          </TouchableOpacity>

                          <Image source={{ uri: LOCALHOST+ user.avatarCover }} style={{ width: '100%', height: '100%', resizeMode: 'contain'}} />
                      </View>
                  </View>
              </Modal>
            </TouchableOpacity> 
          )}

          {user.avatar === null? 
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
              <Image source={{ uri: addCloudinaryDomain(user.avatar) }} style={Style.avatar} />
              
              <Modal visible={showConfirmation} animationType="fade" transparent style = {{ position: 'absolute',top: 0, bottom: 0, left: 0,right: 0}}>
                  <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center',alignItems: 'center'}}>
                      <View style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', width: '100%', overflow: 'hidden'}}>
                          <TouchableOpacity onPress={handleCancel} style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 8, borderRadius: 20,zIndex: 1}}>
                              <Image source={require('../../Icons/delete-icon.png')} style={{height: 20, width: 20}} />
                          </TouchableOpacity>

                          <Image source={{ uri: addCloudinaryDomain(user.avatar) }} style={{ width: '100%', height: '100%', resizeMode: 'contain'}} />
                      </View>
                  </View>
              </Modal>
            </TouchableOpacity>
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