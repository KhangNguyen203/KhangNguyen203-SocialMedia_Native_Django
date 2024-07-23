import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        flex: 3,
    },
    informationBar: {
        height: '10%',
        backgroundColor: '#FFFF66'    
    },
    chatText: {
        fontSize: 18,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
        paddingHorizontal: 10,
        borderRadius: 15
    },title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 12,
        marginLeft: 5,
    },overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },avatar: {
        width: 50,
        height: 50,
        borderRadius: 30,
    }, contentMess: {
        fontSize: 15,
        fontWeight: 'bold',
    }, boxViewContent:{
        backgroundColor: '#66FF66',
        padding:10,
        borderRadius: 20,
    }, showTimeInCenter:{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 5
    },button: {
        backgroundColor: '#CC0000',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },lastMessageText:{
        textAlign: 'right'
    }
})