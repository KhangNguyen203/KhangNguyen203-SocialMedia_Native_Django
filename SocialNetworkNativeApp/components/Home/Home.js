import {Button, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Style from "./Style";
import React, { useEffect, useState, useContext } from "react";
import API, { endpoints } from "../../configs/API";
import MyStyles from "../../styles/MyStyles";
import MyContext from "../../configs/MyContext";
import Post from "../Post/Post";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Toolbar from "./Toolbar";
import {BACKGROUNDCOLOR} from '../../configs/Constant';

const Home = () => {
    const [posts, setPosts] = React.useState(null);
    const [listPosts, setListPosts] = React.useState(null);
    const [user,] = useContext(MyContext);
    const navigation = useNavigation();
    const isFocused = useIsFocused(); 

    const loadPosts = async () => {
        try {
            let res = await API.get(endpoints['posts'])
            setPosts(res.data.results)
        } catch (ex) {
            console.error(ex)
        }
    }

    React.useEffect(() => {
      loadPosts();
    }, [])

    useEffect(() => {
        if (isFocused) {
            loadPosts();
        }
    }, [isFocused])

    const goToFormPost = async () => {
        navigation.navigate("PostForm");
    }

    const handleAddPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    const addCloudinaryDomain = (publicId) => {
        const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
        return `https://${cloudinaryDomain}${publicId}`;
    };


    const checkFriendShip = async (userOne, userTwo) => {
        try {
          let res = await API.get(endpoints["FriendShip"](userOne, userTwo));
          if (res.data !== null && res.data.status === "1") {
            return res.data;
          }
        } catch (ex) {
          // console.error(ex);
        }
        return null;
      };

    useEffect(() => {
        if (posts) {
          const checkFriendship = async () => {
            const updatedListPost = [];
            for (const postItem of posts) {
              if (
                (await checkFriendShip(user.id, postItem.user)) !== null ||
                (await checkFriendShip(postItem.user, user.id)) !== null
              ) {
                updatedListPost.push(postItem);
                
              }
            }
            setListPosts(updatedListPost);
            // console.log(updatedListPost);
          };
          
          if (user != null)
            checkFriendship();
        }
      }, [posts]);

    const goToLogin = async () => {
      navigation.navigate("Login");
    }

    const goToMyProfile = async () => {
      navigation.navigate("MyProfile");
    }
    

    return (
        user === null ? 
            <View style={[MyStyles.containerScreen]}>
              <Image source={require('../../Images/OU-logo.png')} style={{height: 200, width: 250, marginBottom: -20}}/>
              <View style={MyStyles.row}>
                <TouchableOpacity onPress={goToLogin}>
                  <Text style={MyStyles.text_3}>Đăng nhập</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 18, left: 4, top: 2}}>để trải nghiệm ứng dụng</Text>
              </View>
            </View> :
            <>
              <Toolbar/>

              <View style={[MyStyles.container, {marginBottom: 45}]}>
                <ScrollView>
                    <TouchableOpacity style={Style.row} onPress={goToFormPost}>
                      <TouchableOpacity onPress={goToMyProfile}>
                        <Image source={{ uri: addCloudinaryDomain(user.avatar) }} style={MyStyles.avatar} />
                      </TouchableOpacity>

                        <View style={Style.left_4}>
                          <Text style={{color: "black", fontSize: 18, fontWeight: "bold", marginTop: 10, marginLeft: 5}}>Bạn đang nghĩ gì? </Text>
                        </View>

                        

                        <Image source={require('../../Icons/image-gallery-icon.png')} style={{height: 40,width: 40, marginLeft: 160, marginTop: 3}} />
                    </TouchableOpacity>
                    
                    {listPosts === null ? 
                      "" 
                    : <>
                        {listPosts.map(c => (
                            <View key={c.id}>
                                <Post post={c} />
                            </View>
                        ))}
                      </>}
                </ScrollView>
              </View> 
            </>    
    );
}

export default Home;