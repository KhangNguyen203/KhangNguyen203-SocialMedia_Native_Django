import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../configs/MyContext';
import API, { endpoints } from '../../configs/API';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Style from './Style';
import MyStyles from '../../styles/MyStyles';
import { TIMELOADFRIENDSTATUS } from "../../configs/Constant";
import Friendstatus from "../User/Friendstatus";
import Context from '../../configs/Context';

const ListFriends = ({ navigation }) => {
    const [listUser, setListUser] = useState(null);
    const [user] = useContext(MyContext);
    const [listUser2, setListUser2] = useState([]);
    const [loading, setLoading] = useContext(Context);
  
    useEffect(() => {
        const loadListUser = async () => {
            try {
                let res = await API.get(endpoints["listUsers"]);
                setListUser(res.data.results);
            } catch (ex) {
                console.error(ex);
            }
        };
    
        loadListUser();
    }, [user]);

    const checkFriendShip = async (userOne, userTwo) => {
        try {
            let res = await API.get(endpoints["FriendShip"](userOne, userTwo));
            if (res.data !== null && res.data.status === "1") {
                // console.log(res.data);
                return res.data;
            }
        } catch (ex) {
            // console.error(ex);
        }
        return null;
    };

    useEffect(() => {
        const checkFriendship = async () => {
          const updatedListUser = [];
          for (const userItem of listUser) {
            if (
              (await checkFriendShip(user.id, userItem.id)) != null ||
              (await checkFriendShip(userItem.id, user.id)) !== null
            ) {
              updatedListUser.push(userItem);
            }
          }
          setListUser2(updatedListUser);
        };
        checkFriendship()
      }, [listUser, loading]);

    const goToProfile = (userID) => {
        navigation.navigate("ProfileFriend", { userID });
    };

    const addCloudinaryDomain = (publicId) => {
        const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
        return `https://${cloudinaryDomain}${publicId}`;
    };

    return (
        <View>
            {/* <Text style={Style.subject}>Danh sách bạn bè</Text> */}

            {listUser2 === null ? (
                <ActivityIndicator />
            ) : (
                <ScrollView>
                    {listUser2.map((c) => (
                        c && user && c.id !== user.id && c.id !== 1 && (
                            <TouchableOpacity key={c.id} onPress={() => goToProfile(c.id)}>
                                <View style={Style.row}>
                                    <Image source={{ uri: addCloudinaryDomain(c.avatar) }} style={Style.avatar} />
                                    <View style={Style.location}> 
                                        <View style={{marginLeft: 5, marginBottom: 5}}>
                                            <Text style={[MyStyles.title]}>{c.last_name}</Text>
                                            <Text style={{color: "#777777"}}>{c.email}</Text>
                                        </View>

                                        <View style={MyStyles.row}>
                                            <Friendstatus userOneID={user.id} userTwoID={c.id} />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

export default ListFriends;