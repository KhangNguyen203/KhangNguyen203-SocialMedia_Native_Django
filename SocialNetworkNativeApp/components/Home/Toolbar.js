import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { Alert, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { NAMEAPP } from "../../configs/Constant";
import { Image } from "react-native";

const Toolbar = () => {
  const navigation = useNavigation();

  const search = () => {
    navigation.navigate("SearchChatBar")
  }

  const listChat = () => {
    navigation.navigate("ListChat")
  }


  return (
    <View style={styles.container}>
      <Image source={require('../../Images/OU-logo2.png')} style={{height: 40, width: 250, left: -10}}/>
      {/* <Text style={styles.title}>Xin chào</Text> */}

      <View style={styles.rightSection}>
        <TouchableOpacity onPress={search}>
          <View style={styles.searchButton}>
            <Ionicons name="search" size={30} color="black" style={styles.searchIcon} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={listChat}>
          <Image source={require('../../Icons/messenger-icon.png')} style={styles.messengerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    fontSize: 25,
    left: -55,
    color: "#6959CD",
    fontWeight: "bold"
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  messengerIcon: {
    height: 30,
    width: 30,
  },
});

export default Toolbar;