import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, ScrollView } from 'react-native';
import MyContext from '../../configs/MyContext';
import API, { endpoints } from '../../configs/API';
import Notification from './Notification';

const ListNotification = () => {
    const [listNotification, setListNotification] = useState([]);
    const [user,] = useContext(MyContext);

    useEffect(() => {
        loadNotification();
    }, [user]);

    const loadNotification = async () => {
        try {
            let res = await API.get(endpoints["get-notification-by-userID"](user.id));
            setListNotification(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ScrollView>
            {listNotification === null ? "" : listNotification.map(item => (
                item.userMake === user.id 
                    ? null 
                    : <Notification notification={item} />
            ))}
        </ScrollView>
    );
}
export default ListNotification;
