import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 16,
        marginLeft: 5, 
        marginRight: 5,
        borderRadius: 8,
      },
      title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 2,
        marginLeft: "25%",
      },
      content: {
        fontSize: 16,
        marginBottom: 10,
        marginLeft: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },  form_container: {
        marginTop:'30%',
        borderRadius: 10,
        padding: 16,
        margin: 10,
        backgroundColor: '#ffffff',
        height: '50%'
      },
      input: {
        flex: 1,
          height: 40,
          paddingHorizontal: 10,
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 20,
          marginRight: 10,
      },image: {
        width: 40,
        height: 40,
        marginRight: 10,
      }, position_text_5: {
        left: -5,
        fontSize: 18,
        marginTop: 15,
        color: 'blue',
      },containerPost: {
        backgroundColor: '#ffffff',
        padding: 16,
        margin: 6,
        borderRadius: 8,
      },title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 2,
        marginLeft: "25%",
      },
      contentPost: {
        fontSize: 16,
        // marginBottom: 5,
        left: 10,
      },
      time: {
        top: 0,
        marginLeft: "27%",
        marginBottom: 20,
        color: "#777777"
      }, m_10: {
        // margin: 2
      },container_2: {
        backgroundColor: '#ffffff',
        // padding: 16,
        left:10,
        // borderRadius: 8,
      },top_2:{
        marginTop: 1,
        marginBottom: 1,
      }, right_2: {
        marginRight: 2,
        marginBottom: 10,
      }, left_3:{
        marginLeft: 50,
      }, left_4: {
        marginLeft: 30,
        marginTop: 5,
      }, left_5:{
        marginLeft: 85,
        marginBottom: 10, 
        marginTop: 5
      },right_3:{
        marginRight:20,
      },color_2:{
        backgroundColor: '#CFCFCF',
        padding: 5, 
        borderRadius: 10,
      }, fontSize_2:{
        fontSize: 5,
      }, button: {
        textAlign: "center",
        backgroundColor: "darkblue",
        color: "white",
        padding: 10
      }, comment: {
        width: 300,
        backgroundColor: "lightgray",
        padding: 5
      },loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      buttonContainer_2: {
        backgroundColor: '#6666FF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },line: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
      },container_3: {
        backgroundColor: '#ffffff',
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 8,
      }, avatar_reg: {
        width: 200,
        height: 100,
        marginBottom:5,
        borderRadius: 10,
      },Text_button:{
        color: 'white',
        left: 3
      }, button_addPost: {
        backgroundColor: 'blue',
        color: 'white',
        fontSize: 16,
        marginLeft:"33%",
        width: "30%",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        textAlign: 'center',
      },
      border_2:{
        margin: 5,
        borderWidth: 1, // Độ dày của viền
        borderColor: "#777777", // Màu sắc của viền
        borderRadius: 10, // Độ cong của viền
        padding: 5, // Khoảng cách giữa nội dung và viền
      },horizontalLine: {
        borderBottomColor: '#777777',
        borderBottomWidth: 1,
        marginBottom: 10
      },absoluteFill: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
      },
})