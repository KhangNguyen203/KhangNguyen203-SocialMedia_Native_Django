import React, { useContext, useEffect, useState } from 'react';
import MyStyles from '../../styles/MyStyles';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MyContext from '../../configs/MyContext';
import { ref, child, get, getDatabase, onValue} from 'firebase/database';
import { db } from '../../configs/FirebaseConfig';
import API, { endpoints } from '../../configs/API';
import { Image } from 'react-native';
import Style from './Style';
import { useNavigation } from "@react-navigation/native";
import {BACKGROUNDCOLOR} from '../../configs/Constant';
import SearchChatBar from '../Search/SearchChatBar';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const ListChat = () => {
  const [user] = useContext(MyContext);
  const [data, setData] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [lastChats, setLastChats] = useState({});
  const [lastChats2, setLastChats2] = useState({});
  const [sumChats, setSumChats] = useState({});
  const [sum, setSum] = useState(0);
  const navigation = useNavigation();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatList = await getListChat(user.id);

        //Tính tổng tin nhắn hiện có của userLogin
        setSumChats(calculateSum(chatList));

        //Lấy danh sách id của các user có chat với userLogin
        const receiverIDs = Object.keys(chatList);
        setData(receiverIDs);

        //Lấy danh sách tin nhắn cuối của các receiverIDs và lưu vào biến lastChats2
        getLastChats2(receiverIDs);

        //Lấy danh sách id của các user có chat với userLogin đã sắp xếp theo time và lưu vào arr
        let arr =  sortChatsByTime(lastChats2);

        loadUsers(arr);
        
        //LoadUser nếu có thêm cuộc trò chuyện
        if(receiverIDs.length > listUser.length)
          loadUsers(arr);
        
        //LoadUser nếu có thêm chat mới
        if (sumChats > sum){
          loadUsers(arr);
          setSum(sumChats);
        }

        getLastChats(arr);
      } catch (error) {
        console.error(error);
      }
    };

    
    fetchData();
  }, [user, data]);

  const sortChatsByTime = (obj) => {
    const sortedKeys = Object.keys(obj).sort((a, b) => {
      const timeA = obj[a].time || 0;
      const timeB = obj[b].time || 0;
      return timeB - timeA;
    });  
    return sortedKeys;
  };

  const getListChat = async (userID) => {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `chatlist/${userID}`));
    if (snapshot.exists()){
      return snapshot.val();
    } else {
      // console.log("No data available");
      return {};
    }
  };

  const loadUsers = async (receiverIDs) => {
    try {
      const promises = receiverIDs.map((userID) => loadUser(userID));
      const results = await Promise.all(promises);
      setListUser(results);
    } catch (ex) {
      console.error(ex);
    }
  };

  const loadUser = async (userID) => {
    try {
      const res = await API.get(endpoints["users"](userID));
      return res.data;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  };


  const calculateSum = (data) => {
    let sum = 0;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const innerKeys = Object.keys(data[key]);
        sum += innerKeys.length;
      }
    }
    return sum;
  }

  const getLastChats2 = (receiverIDs) => {
    setLastChats2({});

    receiverIDs.forEach((receiverID) => {
      const chatRef = ref(db, `chatlist/${user.id}/${receiverID}`);
      onValue(chatRef, (snapshot) => {
        const snapshotVal = snapshot.val();
        const data = snapshotVal ? Object.values(snapshotVal) : [];
        data.sort((a, b) => a.time - b.time);

        const lastChat = data[data.length - 1];
        
        setLastChats2((prevChats) => ({
          ...prevChats,
          [receiverID]: lastChat,
        }));
      });
    });
  };
 

  const getLastChats = (receiverIDs) => {
    receiverIDs.forEach((receiverID) => {
      const chatRef = ref(db, `chatlist/${user.id}/${receiverID}`);
      onValue(chatRef, (snapshot) => {
        const snapshotVal = snapshot.val();
        const data = snapshotVal ? Object.values(snapshotVal) : [];
        // data.sort((a, b) => a.timestamp - b.timestamp);
        data.sort((a, b) => a.time - b.time);

        const lastChat = data[data.length - 1];
        setLastChats((prevChats) => ({
          ...prevChats,
          [receiverID]: lastChat,
        }));
      });
    });
  };

  const search = () => {
    navigation.navigate("SearchChatBar")
  }

  const goToMess = async (user) =>{
    navigation.navigate('SingleChat', {receiver: user})
  }

  const goBack = () => {
    navigation.navigate("Home")
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  const checkContent = (noidung) => {
    if(noidung != null){
      let lenghtText = 25;
      let content = noidung;

      if (content.length < lenghtText)
        return content
      else{
        let nd = content.slice(0, lenghtText); 
        return nd + "...";
      }
    }
  };

  const addCloudinaryDomain = (publicId) => {
    const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
    return `https://${cloudinaryDomain}${publicId}`;
  };

  return (
      user === null
      ? 
        <ActivityIndicator style={{marginTop: 10}}/>
      :(
        <View style={[MyStyles.container, {flex: 1}]}>
          <View style={styles.container}>
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="arrow-back" size={30} color="black" style={{ marginRight: 20, marginTop: 10}} />
            </TouchableOpacity>
            <Text style={styles.title}>Đoạn chat</Text>
            <TouchableOpacity onPress={search}>
              <View style={styles.searchButton}>
                <Ionicons name="search" size={24} color="white" style={styles.searchIcon} />
                <Text style={styles.searchText}>Search</Text>
              </View>
            </TouchableOpacity>
          </View>

          <ScrollView style={{marginTop: 10, marginBottom: 10}}>
            {listUser.map((u) => (
              u.id === user.id?
                ""
              :(
                <TouchableOpacity key={u.id} onPress={() => goToMess(u)}>
                  <View style={[MyStyles.row, {marginBottom: 15, marginLeft: 10}]} key={u.id}>
                    <Image source={{ uri: addCloudinaryDomain(u.avatar) }} style={Style.avatar} />
                    <View style={{marginLeft: 10}}>
                      <Text style={MyStyles.title}>{u.last_name}</Text>

                      {lastChats[u.id]?.sender === user.id? 
                        <View style={MyStyles.row}>
                          <Text style = {{marginRight: 10}}>Bạn: {checkContent(lastChats[u.id]?.content)}</Text>
                          <Text>.{formatTime(lastChats[u.id]?.time)}</Text>
                        </View>
                      : 
                        <View style={MyStyles.row}>
                          <Text style = {{marginRight: 10}}>{checkContent(lastChats[u.id]?.content)}</Text>
                          <Text>.{formatTime(lastChats[u.id]?.time)}</Text>
                        </View>
                      }
                    </View>
                  </View>
                </TouchableOpacity>
              )
            ))}
          </ScrollView>
        </View>
      )
  );
};

export default ListChat;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#87CEFA",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    // fontFamily: "sans-serif", // Change the font family here
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    fontSize: 16,
    color: "white",
    // fontFamily: "", // Change the font family here
  },
});