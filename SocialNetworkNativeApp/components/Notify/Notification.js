import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Post from '../Post/Post';
import { Text } from 'react-native';
import API, { endpoints } from '../../configs/API';
import MyStyles from '../../styles/MyStyles';
import moment from "moment";
import 'moment/locale/vi';
import { useNavigation } from '@react-navigation/native';


const Notification = ({notification}) => {
    const [user, setUser] = useState(null);
    const [post, setPost] = useState(null);
    const navigation = useNavigation();
    moment.locale('vi');


    useEffect(() => {
        const loadUser = async () => {
            try {
                let res = await API.get(endpoints["users"](notification.userMake));
                setUser(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        
        if(notification.typeNoti !== 1){
            const loadPost = async () => {
                try {
                    let res = await API.get(endpoints["getPostByID"](notification.post));
                    setPost(res.data);
                } catch (error) {
                    console.error(error);
                }
            }

            loadPost();
        }

        loadUser();
    }, [notification]);

    const goToDetailPost = () => {
        navigation.navigate('PostDetail', {post: post})
    }

    const goToProfile = (userID) => {
        navigation.navigate("ProfileFriend", { userID });
    };

    const addCloudinaryDomain = (publicId) => {
        const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
        return `https://${cloudinaryDomain}${publicId}`;
    };

    return (
        notification === null? 
            ""
        : 
        (
            <TouchableOpacity style={[styles.notificationItem, MyStyles.row]} onPress={notification.typeNoti === "1"? ()=> goToProfile(notification.userMake) : goToDetailPost}>
                {user && <Image source={{ uri: addCloudinaryDomain(user.avatar)}} style={styles.avatar} />}
                <View>
                    <Text style={styles.notificationContent}>{notification.content}</Text>
                    <Text style={styles.notificationTime}>{moment(notification.created_date).fromNow()}</Text>
                </View>
            </TouchableOpacity>
        )

    );
}

export default Notification;

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 0,
        marginLeft: 15,
        marginTop: 10,
        color: 'blue',
    },
    listContainer: {
        paddingHorizontal: 10,
    },
    notificationItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    notificationContent: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    notificationTime: {
        fontSize: 12,
        color: '#888',
    },avatar: {
        width: 50,
        height: 50,
        borderRadius: 150,
        marginLeft: 10, 
        marginRight: 10
    },
});
