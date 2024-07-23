import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import API, { endpoints } from "../../configs/API";
import MyStyles from "../../styles/MyStyles";
import Style from "./Style";
import moment from "moment";
import Post from "../Post/Post";
import { TouchableOpacity } from "react-native";
import {UpdatingFunction} from "../../configs/Constant";
import Context from "../../configs/Context";
import MyContext from "../../configs/MyContext";
import PostShare2 from "./PostShare2";


const PostShare = (props) => {
  const [sharePosts, setSharePosts] = useState(null);
  const [user,] = useContext(MyContext);
  const [userr, setUserr] = useState(null);
  const [loading, setLoading] = useContext(Context);
  moment.locale('vi');

    useEffect(() => {
        const loadSharePosts = async () => {
            try {
                let res = await API.get(endpoints.getSharePostsByUserID(props.userID));
                setSharePosts(res.data);
                // console.log(res.data);
            } catch (ex) {
                console.error(ex);
            }
        };
        const loadUser = async () => {
          try {
            let res = await API.get(endpoints['users'](props.userID));
            setUserr(res.data);
          } catch (ex) {
            // console.error(ex);
          }
        } 
      
        loadUser();
        loadSharePosts();
    }, [props.userID, loading]);


    const addCloudinaryDomain = (publicId) => {
        const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
        return `https://${cloudinaryDomain}${publicId}`;
    };
    
  return (
    <View>
      {sharePosts === null ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          {sharePosts.map((c) => (
            <View key={c.id} style = {[Style.border_2, {paddingBottom: -10}]}>
              {user && (
                <View style={[MyStyles.row, {marginBottom: -5}]}>
                    <Image
                      source={{ uri: addCloudinaryDomain(userr?.avatar) }}
                      style={MyStyles.avatar}
                    />
                    <View>
                      <Text style={Style.title}>{userr?.last_name}</Text>
                      <Text style={Style.time}>
                          {moment(c.created_date).fromNow()}
                      </Text>
                    </View>

                    <TouchableOpacity style={{left: 110, marginTop: 10}} onPress={UpdatingFunction}>
                      <Image source={require('../../Icons/three-dot-icon.png')} style={{height: 20,width: 20}} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{left: 130, marginTop: 10}} onPress={UpdatingFunction}>
                      <Image source={require('../../Icons/delete-icon.png')} style={{height: 20,width: 20}} />
                    </TouchableOpacity>
                </View>
              )}

              <PostShare2 sharePosts={c}/>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
    
  );
};

export default PostShare;