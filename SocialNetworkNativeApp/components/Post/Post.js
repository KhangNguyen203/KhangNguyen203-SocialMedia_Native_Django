import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import API, { endpoints } from '../../configs/API';
import MyStyles from '../../styles/MyStyles';
import moment from "moment";
import 'moment/locale/vi';
import PostImage from './PostImage';
import Style from './Style';
import { useNavigation } from '@react-navigation/native';
import Like from './Like';
import MyContext from '../../configs/MyContext';
import Share from './Share';
import { Feather } from '@expo/vector-icons';
import {ICONSIZE, UpdatingFunction} from '../../configs/Constant';
import DeletePost from './deletePost';
import TotalInteraction from './TotalInteraction';


const Post = ({post}) => {
  const [userr, setUserr] = useState(null);
  const [user,] = useContext(MyContext);
  moment.locale('vi');
  const navigation = useNavigation();


  useEffect(() => {
    const loadUser = async () => {
      try {
        if (post && post.user) {
          let res = await API.get(endpoints['users'](post.user));
          setUserr(res.data);
        }
      } catch (ex) {
        // console.error(ex);
      }
    } 
  
    loadUser();
  }, [post]);


  const goToPostDetail = async (post, userr) => {
    navigation.navigate("PostDetail", { post: post, userr: userr });
  };

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };

  const goToProfile = (userID) => {
    navigation.navigate("ProfileFriend", { userID });
  };


  return (
    <View style={Style.container}>
      {userr === null? <ActivityIndicator/>: 
        <>
          <TouchableOpacity key={post.id} onPress={() => goToPostDetail(post, userr)}>
            <TouchableOpacity key={userr.id} onPress={() => goToProfile(userr.id)}>
              <View style={MyStyles.row}>
                  <Image source={{uri: addCloudinaryDomain(userr.avatar)}} style={MyStyles.avatar}/>
                  <View>
                    <Text style={Style.title}>{userr.last_name}</Text>
                    <Text style={Style.time}>{moment(post.created_date).fromNow()}</Text>
                  </View>

                  <TouchableOpacity style={{left: 90}} onPress={UpdatingFunction}>
                    <Image source={require('../../Icons/three-dot-icon.png')} style={{height: 20,width: 20}} />
                  </TouchableOpacity>

                  <View style={{left: 125}}>
                    <DeletePost post={post}/>
                  </View>
              </View>
            </TouchableOpacity>

            {post.content === ""
            ? 
              ""
            :
              <Text style={Style.content}>{post.content}</Text>
            }

            <PostImage postID = {post.id}/>

            <TotalInteraction post = {post}/>

            <View style={Style.horizontalLine} />

            {user === null? "" : 
              <View style={Style.buttonContainer}>
                <Like post={post} user={user}/>
                <TouchableOpacity onPress={() => goToPostDetail(post, userr)}>
                  <View style={MyStyles.row}>
                    <Feather name="message-circle" size={ICONSIZE} color="#777777" />
                    <Text style={MyStyles.text_4}>Bình luận</Text>
                  </View>
                </TouchableOpacity>

                <Share UserID={user.id} PostID={post.id}/>
              </View>
            }
          </TouchableOpacity>
        </>
      }
    </View>
  );
};

export default Post;