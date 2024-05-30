import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import API, { endpoints } from '../../configs/API';
import SimpleToast from 'react-native-simple-toast';
import { TouchableOpacity } from 'react-native';
import Style from './Style';
import { Text } from 'react-native';
import { CreateNotification, TIMELOADFRIENDSTATUS } from '../../configs/Constant';



const Friendstatus = (props) => {
    const {userOneID, userTwoID} = props;
    const [friendShip, setFriendShip] = useState(null);

    useEffect(() => {
      const interval = setInterval(loadFriendShip, TIMELOADFRIENDSTATUS);
    }, [userOneID, userTwoID]);

    const loadFriendShip = async () => {
        try {
          let res = await API.get(endpoints["FriendShip"](userOneID, userTwoID));
          setFriendShip(res.data);
        } catch (ex) {
          try {
            let res = await API.get(endpoints["FriendShip"](userTwoID, userOneID));
            setFriendShip(res.data);
          } catch (ex) {
            // console.log("No found friendShip!!");
            setFriendShip(null);
          }
        }
    };

    const friendRequirement = async () => {
        try {
          let reqData = {
            status: "0",
            user_one: userOneID,
            user_two: userTwoID
          };
    
          let res = await API.post(endpoints.addFriendShip, reqData);
          SimpleToast.show("Đã gửi lời mời kết bạn");
    
          // Load lại thông tin friendShip
          loadFriendShip();
        } catch (ex) {
          console.error(ex);
        }
    };

    const friendAgreement = async () => {
        try {
          let reqData = {
            status: "1",
          };
    
          let res = await API.patch(endpoints["updateFriendShipPath"](friendShip?.id), reqData);
          SimpleToast.show("Đã thêm bạn mới");
          await CreateNotification(1, userOneID, userTwoID, `${user.last_name} đã đồng ý lời mời kết bạn`, null);
          console.log(res.data);
          
          // Load lại thông tin friendShip
          loadFriendShip();
        } catch (ex) {
          console.error(ex);
        }
    }

    const friendCancellation = (friendShipID) => {
      API.delete(endpoints["deleteFriendShip"](friendShipID));
      SimpleToast.show("Đã hủy yêu cầu kết bạn");
      
      // Ngủ 2 giây
      setTimeout(() => {
        friendCancellation2(friendShipID);
      }, 10);
    }

    const friendCancellation2= (friendShipID) => {
      API.delete(endpoints["deleteFriendShip"](friendShipID));
      SimpleToast.show("Đã hủy yêu cầu kết bạn");
      loadFriendShip();
    }

    return (
        <View>
            {friendShip === null ?
                <TouchableOpacity style={Style.buttonGo} onPress={friendRequirement}>
                    <Text style={Style.buttonTextGo}>Thêm bạn bè</Text>
                </TouchableOpacity>
            :(
                friendShip.status === "1" ?
                  <TouchableOpacity style={Style.buttonGo}>
                    <Text style={Style.buttonTextGo}>Bạn bè</Text>
                  </TouchableOpacity>
                : friendShip.status === "0" ?
                    friendShip.user_one === userOneID ? 
                        <TouchableOpacity style={Style.buttonGo} onPress={() => friendCancellation(friendShip.id)}>
                            <Text style={Style.buttonTextGo}>Đã gửi lời mời kết bạn</Text>
                        </TouchableOpacity>
                    : 
                        <TouchableOpacity style={Style.buttonGo} onPress={friendAgreement}>
                            <Text style={Style.buttonTextGo}>Xác nhận</Text>
                        </TouchableOpacity>
                : null
            )
            }
        </View>
    );
}

export default Friendstatus;
