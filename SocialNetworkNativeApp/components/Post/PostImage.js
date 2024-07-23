import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native"
import API, { endpoints } from "../../configs/API";
import Style from "./Style";
import { Modal } from "react-native";

const PostImage = ({postID}) => {
    const [imgPost, setImgPost] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const loadImgPost = async () => {
            try {
                let res = await API.get(endpoints['imgPosts'](postID));
                setImgPost(res.data);
            } catch (ex) {
            //   console.log(postID +" không có hình ");
            }
        };
        loadImgPost();
    }, [postID])

    useEffect(() => {
        if (imgPost !== null) {
            console.log(imgPost)
        }
    }, [postID]);

    const addCloudinaryDomain = (publicId) => {
        const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
        return `https://${cloudinaryDomain}${publicId}`;
    };

    //Xử lý hiện ZoomImage
    const handleDeleteConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <View style={[{ flexDirection: 'row'},  Style.container_2]}>
            {imgPost === null ? (
                ""
            ) : (
                imgPost.map((c, index) => (
                    <View key={c.id} style={[index === 0 && imgPost.length === 1 ? { flex: 2 } : { flex: 2 }, {marginBottom: 5}]}>
                        <TouchableOpacity onPress={handleDeleteConfirmation}>
                            <Image source={{ uri: addCloudinaryDomain(c.image) }} style={[Style.m_10, {borderRadius: 10 , width: index === 0 && imgPost.length === 1 ? 330 : 160, height: 200 }]}/>
                           
                            <Modal visible={showConfirmation} animationType="fade" transparent style = {{ position: 'absolute',top: 0, bottom: 0, left: 0,right: 0}}>
                                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center',alignItems: 'center'}}>
                                    <View style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', width: '100%', overflow: 'hidden'}}>
                                        <TouchableOpacity onPress={handleCancel} style={{ position: 'absolute', top: 20, right: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 8, borderRadius: 20,zIndex: 1}}>
                                            <Image source={require('../../Icons/delete-icon.png')} style={{height: 20, width: 20}} />
                                        </TouchableOpacity>

                                        <Image source={{ uri: addCloudinaryDomain(c.image) }} style={{ width: '100%', height: '100%', resizeMode: 'contain'}} />
                                    </View>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                    </View> 
                ))
            )}
        </View>
        
    );
}

export default PostImage;