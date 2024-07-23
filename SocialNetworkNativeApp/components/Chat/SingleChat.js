import React, { useContext, useEffect, useState } from 'react';
import { Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Style from './Style';
import {ref, set, onValue} from 'firebase/database'; 
import { db } from '../../configs/FirebaseConfig';
import uuid from "react-native-uuid";
import SimpleToast from 'react-native-simple-toast';
import MyContext from '../../configs/MyContext';
import MyStyles from '../../styles/MyStyles';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { UpdatingFunction } from '../../configs/Constant';


const SingleChat = ({navigation, route }) => {
    const [user] = useContext(MyContext);
    const [message, setMessage] = useState('');
    const [time, setTime] = useState('');
    const [data, setData] = useState([]);
    const {receiver} = route.params;
  
    useEffect(() => {
      if(user != null){
        // console.info(`user nhận tin: ${receiver.id} , ${receiver.username}`)

        try {
          getChat(user.id, receiver.id);
        } catch (error) {
          console.error(error);
        }
      }
    }, [route.params]);
  
    const sendMessage = () => {
      if (message === "") return false;
      
      if(user != null){

        try {
          let data = {
            id: uuid.v4(),
            content: message,
            time: new Date().getTime(),
            sender: user.id,
          };
    
          set(ref(db, `chatlist/${user.id}/${receiver.id}/${data.id}`), data);
          set(ref(db, `chatlist/${receiver.id}/${user.id}/${data.id}`), data);
    
          SimpleToast.show("Gửi thành công...");
    
          setMessage('');
        } catch (error) {
          console.error(error)
        }
      }
    };
  
    const getChat = (senderID, receiverID) => {
      const chatRef = ref(db, `chatlist/${senderID}/${receiverID}`);
  
      onValue(chatRef, (snapshot) => {
        const snapshotVal = snapshot.val();
        const data = snapshotVal ? Object.values(snapshotVal) : [];

        // Sắp xếp `data` theo thời gian (tăng dần)
        data.sort((a, b) => a.time - b.time);

        setData(data);
      });
    };

    const goBack = async () => {
      navigation.navigate("ListChat");
    };

    const goToProfile = (userID) => {
      navigation.navigate("ProfileFriend", { userID });
    };

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes < 3 ? '0' + minutes : minutes}`;
    };

    const checkContent = (noidung) => {
      let lenghtText = 30;
      let content = noidung;
      if (content.length > lenghtText) {
        const chunks = [];
        let i = 0;
        while (i < content.length) {
          chunks.push(content.substr(i, lenghtText));
          i += lenghtText;
        }
        content = chunks.join('\n');
      }
    
      return content;
    };

    const addCloudinaryDomain = (publicId) => {
      const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
      return `https://${cloudinaryDomain}${publicId}`;
    };
  
    return (
      user === null? "" : 
        <View style={Style.container}>
          <View style={[Style.informationBar]}>
            <View style={[{padding: 5, flex: 1, flexDirection: "row"}]}>

              <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity onPress={goBack}>
                  <Ionicons name="arrow-back" size={30} color="black" style={{ marginRight: 20, marginTop: 10}} />
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row"}} onPress={() => goToProfile(receiver.id)}>
                  <Image source={{ uri: addCloudinaryDomain(receiver.avatar) }} style={Style.avatar} />
                  <Text style={Style.title}>{receiver.last_name}</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: "row", flex: 1}}>
                <TouchableOpacity onPress={UpdatingFunction}>
                  <Image source={require('../../Icons/call-icon2.png')} style={{height: 30,width: 30, left: 110, top: 10}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={UpdatingFunction}>
                  <Image source={require('../../Icons/video-call-icon2.png')} style={{height: 30,width: 30, left: 130, top: 12}} />
                </TouchableOpacity>
              </View>

            </View>
          </View>
      
          <ScrollView style={{ flex: 1, backgroundColor: 'white'}}>
            <View style={{ margin: 10 }}>
              {!data ? null : (
                data.map((p, index) => {
                  // Kiểm tra tin nhắn trước đó
                  const previousMessage = data[index - 1];
                  const showTime = previousMessage && p.time - previousMessage.time > 10 * 60 * 1000;
      
                  return (
                    <React.Fragment key={p.id}>
                      {showTime && (
                        <View style={Style.showTimeInCenter}>
                          <Text>{formatTime(p.time)}</Text>
                        </View>
                      )}
      
                      <View key={p.id} style={[MyStyles.row, { justifyContent: p.sender === user.id ? 'flex-end' : 'flex-start', marginBottom: 5 }]}>
                        {p.sender === user.id ? (
                          <View style={[Style.boxViewContent, { right: 5, backgroundColor: "#0084ff" }]}>
                            <Text style={[Style.contentMess, {color: "white"}]}>{checkContent(p.content)}</Text>
                          </View>
                        ) : (
                          <React.Fragment>
                            {index === 0 || (p.sender !== data[index - 1].sender || p.time - data[index - 1].time > 10 * 60 * 1000) ? (
                              <Image source={{ uri: addCloudinaryDomain(receiver.avatar) }} style={Style.avatar} />
                            ) : (
                              <View style={{ width: 50 }} /> // Thêm khoảng trống bên trái
                            )}
                            <View style={[Style.boxViewContent, { left: 5 }]}>
                              <Text style={Style.contentMess}>{checkContent(p.content)}</Text>
                            </View>
                          </React.Fragment>
                        )}
                      </View>
                      {index === data.length - 1 && p.sender === user.id && (
                        <Text style={Style.lastMessageText}>Đã gửi lúc {formatTime(p.time)}</Text>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </View>
          </ScrollView>
      
          <View style={Style.inputContainer}>
            <TextInput
              style={Style.input}
              placeholder="Type your message..."
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
            <TouchableOpacity onPress={sendMessage} >
              <Image source={require('../../Icons/sent-icon.png')} style={{height: 40,width: 40}} />
            </TouchableOpacity>
          </View>
        </View>
    );
  };
  
  export default SingleChat;
