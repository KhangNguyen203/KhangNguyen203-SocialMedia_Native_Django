import { Alert, Button, Text, View } from "react-native";
import API, { endpoints } from "../../configs/API";
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";
import {CreateNotification, ICONSIZE, loading} from '../../configs/Constant';
import SimpleToast from 'react-native-simple-toast';
import { useState } from "react";
import PostShare from "./PostShare";


const Share = (props, {navigation}) => {
    const [baiViet, setBaiViet] = useState(null);
    const [user, setUser] = useState(null);

    const showAlert = async (message) => {
        Alert.alert(
            'Thông báo',
            message,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
    };

    const getPostByID = async (postID) => {
        try {
            let res = await API.get(endpoints["getPostByID"](postID));
            setBaiViet(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getUserByID = async (userID) => {
        try {
            let res = await API.get(endpoints["users"](userID));
            setUser(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    

    const handleShare = async () => {
        // Xử lý khi người dùng nhấn vào nút share
        try {
            //Lấy post theo postID 
            await getPostByID(props.PostID);

            //Lấy post theo postID 
            await getUserByID(props.UserID);

            let reqData = {
              'user': props.UserID,
              'post': props.PostID, 
            };
            let res = await API.post(endpoints.addShare, reqData);

            if (baiViet !== null)
                await CreateNotification(2, props.UserID , baiViet.user, `${user.last_name} đã chia sẽ bài viết của bạn`, baiViet.id);

            SimpleToast.show("Đã chia sẻ");


        } catch (ex) {
            console.error(ex);
        }
    };

    return(
        <View>
            {/* <Button title="Chia sẻ" onPress={handleShare} /> */}
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