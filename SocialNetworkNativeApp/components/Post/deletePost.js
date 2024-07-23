import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Modal, Image } from 'react-native';
import MyContext from '../../configs/MyContext';
import { UpdatingFunction } from '../../configs/Constant';
import MyStyles from '../../styles/MyStyles';
import API, { endpoints } from '../../configs/API';
import SimpleToast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import Context from '../../configs/Context';

const DeletePost = ({ post }) => {
  const [user] = useContext(MyContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useContext(Context);

  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleDelete = async () => {
    setShowConfirmation(false);

    try {
      if (post && user && user.id) {
        await API.delete(endpoints['deletePostByID'](post.id));

        SimpleToast.show("Xóa bài viết thành công");

        if (loading === false)
          setLoading(true)
        else
          setLoading(false)
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <View style={styles.container}>
      {post.user === (user && user.id) ? (
        <>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.deleteButton]}
            onPress={handleDeleteConfirmation}
          >
            <Image source={require('../../Icons/delete-icon.png')} style={{ height: 20, width: 20 }} />
          </TouchableOpacity>

          <Modal visible={showConfirmation} transparent animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.confirmationBox}>
                <Text style={{fontSize: 25, fontWeight:'bold', marginBottom: 10}}>Cảnh báo</Text>
                <Text style={styles.confirmationText}>Bạn có chắc chắn muốn xóa bài viết?</Text>
               <View style={MyStyles.row}>
               <TouchableOpacity style={[styles.confirmationButton, {backgroundColor: 'red', marginRight: 15}]} onPress={handleDelete}>
                  <Text style={styles.confirmationButtonText}>Xóa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmationButton} onPress={handleCancel}>
                  <Text style={styles.confirmationButtonText}>Hủy</Text>
                </TouchableOpacity>
               </View>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <TouchableOpacity style={[styles.buttonContainer, styles.updateButton]} onPress={UpdatingFunction}>
          <Image source={require('../../Icons/delete-icon.png')} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  deleteButton: {},
  updateButton: {},
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
    width: 50,
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

export default DeletePost;