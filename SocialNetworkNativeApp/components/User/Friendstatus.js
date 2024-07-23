import React, { useContext, useEffect, useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import API, { endpoints } from '../../configs/API';
import SimpleToast from 'react-native-simple-toast';
import Style from './Style';
import { CreateNotification, TIMELOADFRIENDSTATUS } from '../../configs/Constant';
import Context from '../../configs/Context';
import MyContext from '../../configs/MyContext';
import MyStyles from '../../styles/MyStyles';

const FriendStatus = (props) => {
  const { userOneID, userTwoID } = props;
  const [friendShip, setFriendShip] = useState(null);
  const [loading, setLoading] = useContext(Context);
  const [user] = useContext(MyContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    loadFriendShip();
  }, [userOneID, userTwoID, loading]);

  const loadFriendShip = async () => {
    try {
      let res = await API.get(endpoints["FriendShip"](userOneID, userTwoID));
      setFriendShip(res.data);
    } catch (ex) {
      try {
        let res = await API.get(endpoints["FriendShip"](userTwoID, userOneID));
        setFriendShip(res.data);
      } catch (ex) {
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

      setLoading(prevLoading => !prevLoading);

      SimpleToast.show("Đã gửi lời mời kết bạn");

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

      setLoading(prevLoading => !prevLoading);

      SimpleToast.show("Đã thêm bạn mới");
      await CreateNotification(1, userOneID, userTwoID, `${user.last_name} đã đồng ý lời mời kết bạn`, null);

      loadFriendShip();
    } catch (ex) {
      console.error(ex);
    }
  };

  const friendCancellation = (friendShipID) => {
    API.delete(endpoints["deleteFriendShip"](friendShipID));
    SimpleToast.show("Đã hủy yêu cầu kết bạn");

    if (loading === false)
      setLoading(true)
    else
      setLoading(false)
  }

//Xử lý hủy FriendShip bạn bè=======================
  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleDelete = (friendShipID) => {
    setShowConfirmation(false);


    API.delete(endpoints["deleteFriendShip"](friendShipID));
    SimpleToast.show("Đã hủy kết bạn");

    if (loading === false)
      setLoading(true)
    else
      setLoading(false)
  }

  const handleCancel = () => {
    setShowConfirmation(false);
  };
//===================================================

  return (
    <View>
      {friendShip === null ? (
        <TouchableOpacity style={Style.buttonGo} onPress={friendRequirement}>
          <Text style={Style.buttonTextGo}>Thêm bạn bè</Text>
        </TouchableOpacity>
      ) : (
        friendShip.status === "1" ? (
          <TouchableOpacity style={Style.buttonGo} onPress={handleDeleteConfirmation}>
            <Text style={Style.buttonTextGo}>Bạn bè</Text>
          </TouchableOpacity>
        ) : friendShip.status === "0" ? (
          friendShip.user_one === userOneID ? (
            <TouchableOpacity style={Style.buttonGo} onPress={() => friendCancellation(friendShip.id)}>
              <Text style={Style.buttonTextGo}>Đã gửi lời mời</Text>
            </TouchableOpacity>
            ) : (
              <TouchableOpacity style={Style.buttonGo} onPress={() => friendAgreement()}>
                <Text style={Style.buttonTextGo}>Đồng ý kết bạn</Text>
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity style={Style.buttonGo} onPress={friendRequirement}>
              <Text style={Style.buttonTextGo}>Thêm bạn bè</Text>
            </TouchableOpacity>
          )
        )}
        <Modal
          visible={showConfirmation}
          animationType="fade"
          transparent
        >
          <View style={styles.modalContainer}>
            <View style={styles.confirmationBox}>
              <Text style={{fontSize: 25, fontWeight:'bold', marginBottom: 10}}>Cảnh báo</Text>
              <Text style={styles.confirmationText}>Hủy kết bạn với người dùng này?</Text>
              <View style={MyStyles.row}>
                <TouchableOpacity style={[styles.confirmationButton, {marginRight: 15}]} onPress={handleCancel}>
                  <Text style={[styles.confirmationButtonText, {marginLeft: 20}]}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.confirmationButton, {backgroundColor: 'red'}]} onPress={() => handleDelete(friendShip.id)}>
                  <Text style={styles.confirmationButtonText}>Đồng ý</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  confirmationBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  confirmationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  confirmationButton: {
    width: 70,
    backgroundColor: 'grey',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 0,
    marginVertical: 5,
  },
  confirmationButtonText: {
    color: 'white',
    marginLeft: 12
  },
});
  
export default FriendStatus;