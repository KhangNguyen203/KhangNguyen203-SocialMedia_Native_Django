import { StyleSheet } from "react-native";
import {BACKGROUNDCOLOR} from '../configs/Constant';

export default StyleSheet.create({
    container: {
        backgroundColor:BACKGROUNDCOLOR,
    }, row: {
        flexDirection: "row"
    }, subject: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "blue"
    }, m_10: {
        margin: 6
    }, m_8: {
        margin: 3
    }, title: {
        fontSize: 16,
        fontWeight: "bold"
    }, thumb: {
        width: 120,
        height: 120
    },avatar: {
        width: 45,
        height: 45,
        borderRadius: 30,
        marginRight: '-10%',
    },col: {
        flexDirection: "column"
    },containerScreen:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEEEEE",
    }, text_2: {
        fontSize: 18,
        fontWeight: "bold",
    },text_3:{
        fontSize: 20,
        fontWeight: "bold",
        color: "blue"
    }, text_4:{
        marginTop: 2, 
        marginLeft: 5, 
        fontSize: 15, 
        fontWeight: 'bold', 
        color:"#777777"
    }
});