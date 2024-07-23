import { useContext, useEffect, useState } from "react";
import { Button, TouchableOpacity, View } from "react-native";
import API, { endpoints } from "../../configs/API";
import SimpleToast from 'react-native-simple-toast';
import { Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import MyStyles from "../../styles/MyStyles";
import {CreateNotification, DeleteNotification, ICONSIZE} from '../../configs/Constant';
import Context from "../../configs/Context";


const Like = ({ post, user }) => {
  const [like, setLike] = useState(null);
  const [liked, setLiked] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useContext(Context);

  useEffect(() => {
    const getLike = async () => {
      try {
        let res = await API.get(endpoints["get-like"](post.id, user.id));
        setLiked(res.data);
      } catch (ex) {
        // console.log(user.username + " chưa like bài viết " + post.id);
      }
    };

    getLike();
  }, [refresh]);

  const handleLike = async () => {
    try {
      let reqData = {
        post: post.id,
        user: user.id,
      };
      let res = await API.post(endpoints["add-like"], reqData);
      await CreateNotification(2, user.id, post.user, `${user.last_name} đã thích bài viết của bạn`, post.id);

      if (loading === false)
        setLoading(true)
      else
        setLoading(false)

      SimpleToast.show("Like success");
      setRefresh(!refresh);

    } catch (ex) {
      // console.error(ex);
    }
  };

  const handleUnLike = async () => {
    try {
      let res = await API.delete(endpoints["delete-like"](liked.id));

      //Xử lý xóa thông báo like khi nhấn unlike
      // await DeleteNotification(liked.id);

      if (loading === false)
        setLoading(true)
      else
        setLoading(false)
      
      console.log("UnLike success!");
      setLiked(null);
      setRefresh(!refresh);
    } catch (ex) {
      // console.error(ex);
    }
  };

  return (
    <View>
      {liked === null ? (
        <TouchableOpacity onPress={handleLike}>
          <View style={MyStyles.row}>
            <Feather name="thumbs-up" size={ICONSIZE} color="#777777" />
            <Text style={MyStyles.text_4}>Thích</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleUnLike}>
          <View style={MyStyles.row}>
            <Feather name="thumbs-up" size={ICONSIZE} color="#0033CC" />
            <Text style={[MyStyles.text_4,{color:"#0033CC" }]}>Thích</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Like;