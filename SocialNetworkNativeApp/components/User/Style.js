import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        // flex: 1,
        // // justifyContent: 'center',
        // marginTop: '60%',
        // alignItems: 'center',
        // padding: 16,
    },container_Res: {
      flex: 1,
      // justifyContent: 'center',
      marginTop: '5%',
      alignItems: 'center',
      padding: 16,
    },input: {
        backgroundColor: "lightgray",
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
      button: {
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        textAlign: 'center',
      },

      containerProfile: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 0,
        paddingBottom: 10
      },
      avatarCover: {
        width: "100%",
        height: 200,
        opacity: 0.5,
      },
      avatar: {
        width: 150,
        height: 150,
        borderRadius: 150,
        marginTop: -80,
      },
      username: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
      },
      status: {
        fontSize: 16,
        textAlign: "center",
        marginHorizontal: 16,
      },buttonGo: {
        height: 40,
        width: 140,
        backgroundColor: "#cbdff2",
        borderRadius: 5,
        justifyContent: "center", 
        alignItems: "center",
        margin: 5,
        paddingRight: 50,
      },buttonTextGo: {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        left: 20
      },avatarCover_2: {
        width: "100%",
        height: "125%",
        opacity: 0.5,
      },buttonMess: {
        height: 40,
        width: 140,
        backgroundColor: "blue",
        borderRadius: 5,
        justifyContent: "center", 
        alignItems: "center",
        margin: 5,
        paddingRight: 50,
      },buttonTextMess: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        left: 20
      },Text_button:{
        color: 'white'
      },avatar_reg: {
        width: 200,
        height: 100,
        marginBottom:5
      }
})