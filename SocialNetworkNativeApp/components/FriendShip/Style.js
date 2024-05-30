import { StyleSheet } from "react-native";

//Css này chỉ dùng cho cục bộ của Home component
export default StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        // marginRight: '-10%'
    }, row: {
        flexDirection: "row", 
        margin: 10,
        left: 10
    },location:{
        marginTop: 10,
        left: 10
    },  buttonText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },button: {
        backgroundColor: "#0037ae",
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },buttonGo: {
        backgroundColor: "#cbdff2",
        borderRadius: 5,
        justifyContent: "center", // Căn giữa theo chiều dọc
        alignItems: "center", // Căn giữa theo chiều ngang
        margin: 5,
        paddingRight: 50,
    },buttonTextGo: {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        left: 20
    },subject: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        left: -30,
        margin: 10
    },buttonContainer: {
        position: "absolute",
        top: 500,
        right: 20,
    },
})