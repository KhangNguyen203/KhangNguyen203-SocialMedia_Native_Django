import { View, Text, Button, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import API, { endpoints } from '../../configs/API';
import MyStyles from '../../styles/MyStyles';
import moment from "moment";
import { useContext, useEffect, useState } from 'react';
import PostImage from './PostImage';
import Style from './Style';
import Like from './Like';
import MyContext from '../../configs/MyContext';
import Post from './Post';
import { TIMELOADFRIENDSTATUS } from '../../configs/Constant';

const PostProfile = ({ userID }) => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        let res = await API.get(endpoints['postsUser'](userID));
        setPosts(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };
    loadPost();
    // const interval = setInterval(loadPost, TIMELOADFRIENDSTATUS);
  }, [userID]);

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };


  return (
    <View>
      {posts === null ? <ActivityIndicator />: (
        <View>
          {posts.map( p => (
            <Post post={p}/>
          ))}
        </View>
      )}
    </View>
  );
};

export default PostProfile;