import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {View } from "react-native";
import PostProfile from "../Post/PostProfile";
import PostShare from "../Post/PostShare";
import DeletePost from "../Post/deletePost";

const Tab = createMaterialTopTabNavigator();

const TabProfile = (props) => {
  return (
    <View style={{ width: "100%", height: 9000}}>
      <NavigationContainer independent={true}>
        <Tab.Navigator>
          <Tab.Screen name="Bài đăng">{() => <PostProfile userID={props.userID}/>}</Tab.Screen>
          <Tab.Screen name="Bài chia sẻ">{() => <PostShare userID={props.userID} />}</Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default TabProfile;