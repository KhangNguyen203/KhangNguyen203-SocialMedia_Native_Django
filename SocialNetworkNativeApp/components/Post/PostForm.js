import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MyContext from '../../configs/MyContext';
import API, { endpoints } from '../../configs/API';
import Style from './Style';
import MyStyles from '../../styles/MyStyles';
import SimpleToast from 'react-native-simple-toast';
import Context from '../../configs/Context';


const PostForm = ({ navigation }) => {
  const [content, setContent] = useState('');
  const [user] = useContext(MyContext);
  const [loading, setLoading] = useContext(Context);
  const [imgPost, setImgPost] = useState({
    "image": "",
    "post": "",
  });


  const addPost = async () => {
    if(content !== "" || imgPost.image !== ""){
      try {
        let reqData = {
          title: '',
          content: content,
          user: user.id,
          active: 1,
        };
        let data = Object.keys(reqData)
          .map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(reqData[key]);
          })
          .join('&');
    
        let res = await API.post(endpoints['posts'], data);
        let dl = res.data;
    
        change("post", dl.id, (updatedImgPost) => {
  
          if (updatedImgPost.image !== "") {
            const form = new FormData();
            for (let key in updatedImgPost) {
              if (key === 'image') {
                form.append(key, {
                  uri: updatedImgPost[key].uri,
                  name: updatedImgPost[key].fileName,
                  type: 'image/jpeg',
                });
              } else {
                form.append(key, updatedImgPost[key]);
              }
            }
    
            API.post(endpoints['add_image'], form, {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer dbM1gx7jrAbPFc6tQy3lyc1srXqxKN`,
              },
            });
          }
        });
    
        change('image', '');
        setContent("");

        if (loading === false)
          setLoading(true)
        else
          setLoading(false)

        SimpleToast.show("Đăng bài thành công");
        navigation.navigate('Home');
  
      } catch (ex) {
        console.error(ex);
      }
    }else
      SimpleToast.show("Vui lòng nhập nội dung!");
  };

  const picker = async () => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission Denied!');
    } else {
      let res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled) {
        change('image', res.assets[0]);
      }
    }
  };

  const change = (field, value, callback) => {
    setImgPost((current) => {
      const updatedPost = value !== 0 ? value : '0';
      const updatedImgPost = { ...current, [field]: updatedPost };
      if (callback) {
        callback(updatedImgPost);
      }
      return updatedImgPost;
    });
  };

  return (
    <View style={Style.form_container}>
      <TextInput
        style={Style.input}
        placeholder="Nội dung"
        value={content}
        onChangeText={(text) => setContent(text)}
      />

      <TouchableOpacity style={MyStyles.row} onPress={picker}>
        <Image
          style={Style.image}
          source={{ uri: 'https://icons.veryicon.com/png/o/miscellaneous/flat-color-icons/add_image-3.png' }}
        />
        <Text style={Style.position_text_5}>Thêm hình...</Text>
      </TouchableOpacity>

      {imgPost.image ? (
        <Image style={[Style.avatar_reg, {marginLeft: 55}]} source={{uri: imgPost.image.uri}} />
      ) : null}

      <TouchableOpacity onPress={addPost} style={Style.button_addPost}>
        <Text style={Style.Text_button}>Đăng bài</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostForm;