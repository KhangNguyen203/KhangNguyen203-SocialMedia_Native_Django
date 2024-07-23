import { View, Text, Image, StyleSheet, Button, ActivityIndicator, TouchableOpacity, TextInput, ScrollView } from "react-native";
import MyStyles from "../../styles/MyStyles";
import Post from "./Post";
import Style from "./Style";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import API, { authApi, endpoints } from "../../configs/API";
import MyContext from "../../configs/MyContext";
import { CreateNotification } from "../../configs/Constant";
import Context from "../../configs/Context";


const PostDetail = ({ route }) => {
  const { post, userr } = route.params;
  const [comments, setComments] = useState([]);
  const [userComs, setUserComs] = useState([]);
  const [content, setContent] = useState();
  const [user,] = useContext(MyContext);
  const [loading, setLoading] = useContext(Context);
  moment.locale('vi');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(endpoints.comments(post.id));
        setComments(res.data);
        loadUserComments(res.data);
      } catch (ex) {
        console.error(ex);
      }
    };

    fetchData();
  }, [comments, post]);

  const loadUserComments = async (commentsData) => {
    try {
      const users = await Promise.all(commentsData.map((comment) => API.get(endpoints.users(comment.user))));
      setUserComs(users.map((res) => res.data));
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleShare = () => {
    // Xử lý khi người dùng nhấn vào nút chia sẻ
  };

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };

  const addComment = async () => {
    try {
      let reqData = {
        "content": content, 
        "user": user.id,
        "post": post.id, 
      }
      await CreateNotification(2, user.id, post.user, `${user.last_name} đã bình luận bài viết của bạn`, post.id);
      let res = await API.post(endpoints["add-comments"], reqData);
      setComments(current => [res.data, ...current]);
      setContent('');

      if (loading === false)
        setLoading(true)
      else
        setLoading(false)

    } catch (ex) {
        console.error(ex);
    }
  }

  return (
    <ScrollView>
      <Post post={post}/>
      
      <View style={{marginTop: -18}}>
        {user === null ? "" : (
          <View style={Style.line}>
            <View style={[MyStyles.row, {margin: 5}] }>
              <TextInput value={content} onChangeText={t => setContent(t)} style={Style.input} placeholder="Nội dung bình luận"/>
              <TouchableOpacity onPress={addComment} style={Style.buttonContainer_2}>
                <Text style={Style.buttonText}>Bình luận</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      
      <View>
        {comments === null ? (
          ""
        ) : (
          <>
            {comments.map((comment, index) => (
              <View key={comment.id}>
                {userComs[index] === undefined ? (
                  <View style={Style.loadingContainer}>
                    {/* <ActivityIndicator size="small" color="#000" /> */}
                  </View>
                ) : (
                  <>
                    <View style={[MyStyles.row, Style.left_4]}>
                      <Image source={{ uri: addCloudinaryDomain(userComs[index].avatar) }} style={MyStyles.avatar} />
                      <View>
                        <View style={[Style.left_3, Style.color_2]}>
                          <Text style={MyStyles.title}>{userComs[index].last_name}</Text>
                          <Text>{comment.content}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[MyStyles.row, Style.left_5]}>
                      <Text style={Style.right_3}>{moment(comment.created_date).fromNow()}</Text>
                      <TouchableOpacity>
                        <Text style={[Style.right_3, {fontWeight: "bold"}]}>Thích</Text>
                      </TouchableOpacity>                      
                      <TouchableOpacity>
                        <Text style={{fontWeight: "bold"}}>Phản hồi</Text>
                      </TouchableOpacity>                    
                    </View>
                  </>
                )}
              </View>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default PostDetail;