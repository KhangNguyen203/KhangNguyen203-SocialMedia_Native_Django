import React, { createContext, useEffect, useReducer, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Home/Home';
import ListChat from '../Chat/ListChat';
import MyUserReducer from "../../reducers/MyUserReducer";
import MyContext from "../../configs/MyContext";
import Context from "../../configs/Context";
import Login from "../User/Login";
import { Ionicons  } from '@expo/vector-icons';
import UserOptions from "../User/UserOptions";
import Logout from "../User/Logout";
import PostForm from "../Post/PostForm";
import ListFriendShip from "../FriendShip/ListFriendShip";
import SingleChat from "../Chat/SingleChat";
import TabProfile from "./TabProfile";
import PostDetail from "../Post/PostDetail";
import Post from "../Post/Post";
import ProfileFriend from "../User/FriendProfile";
import Toolbar from "../Home/Toolbar";
import Profile from "../User/MyProfile";
import ListFriendRequirement from "../FriendShip/ListFriendRequirement";
import ButtonFriendRequiments from "../FriendShip/ButtonFriendRequiments";
import ListNotification from "../Notify/ListNotification";
import { NAMEAPP } from "../../configs/Constant";
import ListFriends from "../FriendShip/ListFriends";
import DeletePost from "../Post/deletePost";
import { ScreenStackHeaderRightView } from "react-native-screens";
import SearchChatBar from "../Search/SearchChatBar";
import Register from "../User/Register";
import PostShare from "../Post/PostShare";


const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  const [loading, setLoading] = useState(false);


  return (
    <Context.Provider value={[loading, setLoading]} >
      <MyContext.Provider value={[user, dispatch]}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Login">
            {/* Các components bị ẩn */}
            <Tab.Screen name="Logout" component={Logout} options={{ tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="PostForm" component={PostForm} options={{title: "Đăng Bài" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="ListFriendShip" component={ListFriendShip} options={{title: "Danh Sách Bạn Bè" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="SingleChat" component={SingleChat} options={{title: "Cuộc trò chuyện" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="TabProfile" component={TabProfile} options={{tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="PostDetail" component={PostDetail} options={{title: "Bài viết" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="Post" component={Post} options={{title: "Bài viết" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="ProfileFriend" component={ProfileFriend} options={{title: "Trang Cá Nhân" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="Toolbar" component={Toolbar} options={{title: "Thanh công cụ" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="MyProfile" component={Profile} options={{title: "Trang cá nhân" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="ButtonFriendRequiments" component={ButtonFriendRequiments} options={{title: "Nút bấm" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="FriendShip" component={ListFriendShip} options={{title: "Lời mời kết bạn" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="ListFriends" component={ListFriends} options={{title: "Danh sách bạn bè" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="DeletePost" component={DeletePost} options={{title: "Xóa bài viết" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="SearchChatBar" component={SearchChatBar} options={{title: "Tìm kiếm" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="ListChat" component={ListChat} options={{title: "" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="Register" component={Register} options={{title: "Đăng ký" ,tabBarButton: () => null, tabBarVisible: false}}/>
            <Tab.Screen name="PostShare" component={PostShare} options={{title: "Bài viết được chia sẻ" ,tabBarButton: () => null, tabBarVisible: false}}/>


            <Tab.Screen name="Home" component={Home} options={{ title: "Bản tin", tabBarIcon: ({ focused }) => ( 
              <Ionicons name= {focused ? 'home' : 'home-outline'} size={24} color={focused ? '#000' : '#888'}/> )}}
            />

            {user === null? 
              <Tab.Screen name="Login" component={Login} options={{ title: 'Đăng nhập', tabBarIcon: ({ focused }) => ( 
                <Ionicons name= {focused ? 'person' : 'person-outline'} size={24} color={focused ? '#000' : '#888'}/> )}}
              />
            : 
              <>
                <Tab.Screen name="ListFriendRequirement" component={ListFriendRequirement} options={{ title: 'Lời mời kết bạn', tabBarIcon: ({ focused }) => ( 
                  <Ionicons name= {focused ? 'people' : 'people-outline'} size={24} color={focused ? '#000' : '#888'}/> )}}
                />

                {/* <Tab.Screen name="ListChat" component={ListChat} options={{ title: 'Đoạn chat', tabBarIcon: ({ focused }) => ( 
                  <Ionicons name= {focused ? 'chatbox' : 'chatbox-outline'} size={24} color={focused ? '#000' : '#888'}/> )}}
                /> */}

                <Tab.Screen name="ListNotification" component={ListNotification} options={{ title: 'Thông báo', tabBarIcon: ({ focused }) => ( 
                  <Ionicons name= {focused ? 'notifications' : 'notifications-outline'} size={24} color={focused ? '#000' : '#888'}/> )}}
                />

                <Tab.Screen name="UserOptions" component={UserOptions} options={{ title: 'Tài khoản', tabBarIcon: ({ focused }) => ( 
                  <Ionicons name= {focused ? 'person' : 'person-outline'} size={24} color={focused ? '#000' : '#888'}/> )}}
                />
              </>
            }
          </Tab.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </Context.Provider>
  );
}

export default BottomTabNavigator;