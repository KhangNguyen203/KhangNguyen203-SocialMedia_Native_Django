import { useContext } from "react"
import { Button, StyleSheet, Text, TouchableOpacity } from "react-native"
import MyContext from "../../configs/MyContext"
import { useNavigation } from "@react-navigation/native"
import SimpleToast from 'react-native-simple-toast';
import { View } from "react-native";

const Logout = () => {
    const [user, dispatch] = useContext(MyContext);
    const navigation = useNavigation();

    const logout = () => {
        dispatch({
            type: "logout"
        })

        SimpleToast.show("Đã đăng xuất");
        navigation.navigate("Home");
        // navigation.navigate("Login");
    }

    return (
        <TouchableOpacity onPress={logout} style={styles.container}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Logout;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center", 
        marginTop: 30
    },
    button: {
        height: 40,
        width: 150,
        backgroundColor: "#0033CC",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    }
});