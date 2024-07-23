import { Alert, Button, Text, View } from "react-native";
import API, { endpoints } from "../../configs/API";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";
import {CreateNotification, ICONSIZE} from '../../configs/Constant';
import SimpleToast from 'react-native-simple-toast';
import { useContext, useState } from "react";
import Context from "../../configs/Context";
import MyContext from "../../configs/MyContext";


const Share = (props, {navigation}) => {
    const [baiViet, setBaiViet] = useState(null);
    const [user,] = useContext(MyContext);
    const [loading, setLoading] = useContext(Context);

    const getPostByID = async (postID) => {
        try {
            let res = await API.get(endpoints["getPostByID"](postID));
            setBaiViet(res.data);
        } catch (error) {
            // console.error(error);
        }
    }
    
    const handleShare = async () => {
        // Xử lý khi người dùng nhấn vào nút share
        try {
            //Lấy post theo postID 
            await getPostByID(props.PostID);

            let reqData = {
              'user': props.UserID,
              'post': props.PostID, 
            };
            let res = await API.post(endpoints.addShare, reqData);

            if (loading === false)
                setLoading(true);
            else 
                setLoading(false);

            SimpleToast.show("Đã chia sẻ");
            await CreateNotification(2, props.UserID , baiViet?.user, `${user.last_name} đã chia sẽ bài viết của bạn`, baiViet.id);

        } catch (ex) {
            console.error(ex);
        }
    };

    return(
        <View>
            <TouchableOpacity onPress={handleShare}>
                <View style={MyStyles.row}>
                    <Feather name="share-2" size={ICONSIZE} color="#777777" />
                    <Text style={MyStyles.text_4}>Chia sẻ</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Share;