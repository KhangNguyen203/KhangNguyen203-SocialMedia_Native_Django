import React, { useContext } from 'react';
import Logout from './Logout';
import Profile from './MyProfile';
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MyContext from '../../configs/MyContext';
import MyStyles from '../../styles/MyStyles';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UpdatingFunction } from '../../configs/Constant';

const UserOptions = () => {
    const [user,] = useContext(MyContext);
    const navigation = useNavigation();

    const goToProfile = () => {
        navigation.navigate('MyProfile')
    }

    const goToListFriend = () => {
        navigation.navigate('ListFriends')
    }

    const addCloudinaryDomain = (publicId) => {
        const cloudinaryDomain = `res.cloudinary.com/dvebfxho2/`;
        return `https://${cloudinaryDomain}${publicId}`;
    };

    return (
        <ScrollView>
            <TouchableOpacity onPress={goToProfile}>
                <View style = {[MyStyles.row, {padding: 10, backgroundColor: "#87CEFA", marginBottom: 10}]}>
                    <Image source={{uri: addCloudinaryDomain(user.avatar)}} style={styles.avatar}/>
                    <View style = {{left: 50}}>
                        <Text style={{fontSize: 25}}>{user.last_name}</Text>
                        <Text style={{color: "#666666"}}>Xem trang cá nhân</Text>
                    </View>

                    <TouchableOpacity style={{marginLeft: "auto"}}>
                        <Image source={require('../../Icons/change-user-icon2.png')} style={{ height:30, width: 30 , marginTop: 10, marginRight: 20}}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <View>
                <View style={[MyStyles.row]}>
                    <TouchableOpacity style={[styles.item, MyStyles.row]} onPress={goToListFriend}>
                        <Image source={require('../../Icons/friends-icon.png')} style={styles.icon} />
                        <Text style={styles.text}>Bạn bè</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.item, MyStyles.row]} onPress={UpdatingFunction}>
                        <Image source={require('../../Icons/reels-icon.png')} style={styles.icon} />
                        <Text style={styles.text}>Reels</Text>
                    </TouchableOpacity>
                </View>

                <View style={[MyStyles.row, {marginTop: 5}]}>
                    <TouchableOpacity style={[styles.item, MyStyles.row]} onPress={UpdatingFunction}>
                        <Image source={require('../../Icons/gift-icon.png')} style={styles.icon} />
                        <Text style={styles.text}>Sinh nhật</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.item, MyStyles.row]} onPress={UpdatingFunction}>
                        <Image source={require('../../Icons/moment-icon.png')} style={styles.icon} />
                        <Text style={styles.text}>kỷ niệm</Text>
                    </TouchableOpacity>
                </View>

                <View style={[MyStyles.row, {marginTop: 5}]} onPress={UpdatingFunction}>
                    <TouchableOpacity style={[styles.item, MyStyles.row]}>
                        <Image source={require('../../Icons/event-icon2.png')} style={styles.icon} />
                        <Text style={styles.text}>Sự kiện</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.item, MyStyles.row]} onPress={UpdatingFunction}>
                        <Image source={require('../../Icons/video-icon.png')} style={styles.icon} />
                        <Text style={styles.text}>Video</Text>
                    </TouchableOpacity>
                </View>

                <View style={[MyStyles.row, {marginTop: 5}]}>
                    <TouchableOpacity style={[styles.item, MyStyles.row]} onPress={UpdatingFunction}>
                        <Image source={require('../../Icons/marketplace-icon.png')} style={styles.icon} />
                        <Text style={styles.text}>Marketplace</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.item, MyStyles.row]} onPress={UpdatingFunction}>
                        <Image source={require('../../Icons/game-icon.png')} style={styles.icon} />
                        <Text style={styles.text}>Chơi game</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{top: 10}}>
                <View style={[styles.horizontalLine]} />
                <TouchableOpacity style={[MyStyles.row, styles.horizontalLine ,{height: 60}]} onPress={UpdatingFunction}>
                    <Image source={require('../../Icons/question-mark-icon.png')} style={styles.icon2} />
                    <Text style={[styles.text2]}>Trợ giúp & hỗ trợ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[MyStyles.row, styles.horizontalLine ,{height: 60}]} onPress={UpdatingFunction}>
                    <Image source={require('../../Icons/setting-icon.png')} style={styles.icon2} />
                    <Text style={[styles.text2]}>Cài đặt</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[MyStyles.row, styles.horizontalLine ,{height: 60}]} onPress={UpdatingFunction}>
                    <Image source={require('../../Icons/policy-icon.png')} style={styles.icon2} />
                    <Text style={[styles.text2]}>Quyền riêng tư</Text>
                </TouchableOpacity>
               
            </View>
            <Logout/>
        </ScrollView>
    );
}

export default UserOptions;

const styles = StyleSheet.create({
   avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: '-10%',
   },container: {
    flex: 1,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    height: 70, 
    marginLeft: 5, 
    marginRight: 5, 
    backgroundColor: "#B4CDCD",     
    borderRadius: 10,
    padding: 10
  },
  icon: {
    height: 30,
    width: 30,
    marginTop: 10,
  },
  text: {
    marginTop: 15,
    marginLeft: 5
  },horizontalLine: {
    borderBottomColor: '#777777',
    borderTopColor:'#777777',
    borderBottomWidth: 1,
    // marginBottom: 10
  },icon2: {
    height: 40,
    width: 40,
    marginTop: 10,
    left: 10
  },text2: {
    marginTop: 15,
    marginLeft: 5, 
    fontWeight: "bold", 
    fontSize: 20, 
    left: 10
  }
});
