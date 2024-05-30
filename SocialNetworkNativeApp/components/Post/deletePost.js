import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Modal, Image } from 'react-native';
import MyContext from '../../configs/MyContext';
import { UpdatingFunction } from '../../configs/Constant';
import MyStyles from '../../styles/MyStyles';
import API, { endpoints } from '../../configs/API';
import SimpleToast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';



const DeletePost = ({ post }) => {
    const [user,] = useContext(MyContext);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigation = useNavigation();
  
    const handleDeleteConfirmation = () => {
      setShowConfirmation(true);
    };
  
    const handleDelete = () => {
      // Xử lý khi người dùng xác nhận xóa bài viết
      setShowConfirmation(false);
  
      // Thực hiện hành động xóa bài viết
      deletePost();
    };
  
    const handleCancel = () => {
      setShowConfirmation(false);
    };
  
    const deletePost = () => {
      try {
        if (post && user && user.id) {
          API.delete(endpoints['deletePostByID'](post.id));
  
          SimpleToast.show("Xóa bài viết thành công");
          // navigation.navigate('Home')
        }
      } catch (ex) {
        console.error(ex);
      }
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
              {/* Các phần còn lại của mã */}
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
    buttonText: {
        color: 'blue',
        fontSize: 20,
    },
    deleteButton: {
    },
    updateButton: {
    },
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
        backgroundColor: 'gray',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 0,
        marginVertical: 5,
    },
    confirmationButtonText: {
        color: 'white',
    },
});

export default DeletePost;