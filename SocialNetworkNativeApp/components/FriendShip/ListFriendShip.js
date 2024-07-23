import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import API, { endpoints } from "../../configs/API";
import Style from "./Style";
import MyContext from "../../configs/MyContext";
import Friendstatus from "../User/Friendstatus";
import { TIMELOADFRIENDSTATUS } from "../../configs/Constant";
import { Ionicons } from '@expo/vector-icons';
import Context from "../../configs/Context";


const ListFriendShip = ({ navigation }) => {
  const [listUser, setListUser] = useState(null);
  const [user] = useContext(MyContext);
  const [listUser2, setListUser2] = useState([]);
  const [loading, setLoading] = useContext(Context);

  useEffect(() => {
    if (user !== null) {
      const loadListUser = async () => {
        try {
          let res = await API.get(endpoints["listUsers"]);
          setListUser(res.data.results);
        } catch (ex) {
          console.error(ex);
        }
      };

      loadListUser();
    }
  }, [user]);

  useEffect(() => {
    const checkFriendShip = async (userOne, userTwo) => {
      try {
        let res = await API.get(endpoints["FriendShip"](userOne, userTwo));
        if (res.data !== null && (res.data.status === "1" || res.data.status === "0")) {
          return res.data;
        }
      } catch (ex) {
        // console.error(ex);
      }
      return null;
    };

    if (user !== null && listUser !== null) {
      const checkFriendship = async () => {
        const updatedListUser = [];
        for (const userItem of listUser) {
          if (
            (await checkFriendShip(user.id, userItem.id)) === null &&
            (await checkFriendShip(userItem.id, user.id)) === null
          ) {
            updatedListUser.push(userItem);
          }
        }
        setListUser2(updatedListUser);
      };

      checkFriendship();
    }
  }, [user, listUser, loading]);

  const goToProfile = (userID) => {
    navigation.navigate("ProfileFriend", { userID });
  };

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };

  if (user === null) {
    return null; // Hoặc thay thế bằng một component loading tùy chọn
  }

  return (
    <View>
      <Text style={Style.subject}>Những người bạn có thể biết</Text>

      {listUser2 === null ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={{ marginBottom: 40 }}>
          {listUser2.map((c) => (
            c.id !== user.id && c.id !== 1 && (
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

                      <TouchableOpacity style={Style.buttonGo}>
                        <Text style={Style.buttonTextGo}>Gỡ</Text>
                      </TouchableOpacity>
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
};

export default ListFriendShip;