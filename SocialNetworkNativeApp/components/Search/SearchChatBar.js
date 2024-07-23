import React, { useContext, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Style from './Style';
import API, { endpoints } from '../../configs/API';
import ItemUser from './ItemUser';
import MyContext from '../../configs/MyContext';

const SearchChatBar = () => {
    const [contentSearch, setContentSearch] = useState("");
    const [listUser, setListUser] = useState([]);

    const search = async () => {
        try {
            if (contentSearch) {
                let res = await API.get(endpoints['search_users'](contentSearch));
                setListUser(res.data);
            }
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <View>
            <View style={Style.inputContainer}>
                <TextInput
                    style={Style.input}
                    placeholder="Tìm kiếm"
                    value={contentSearch}
                    onChangeText={(text) => setContentSearch(text)}
                />
                <TouchableOpacity onPress={search}>
                    <Ionicons name="search" size={30} color="#66CCCC" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                {listUser === null
                    ? ""
                    : listUser.map(p => (
                        p && p.id ? (
                            <ItemUser key={p.id} userr={p} />
                        ) : null
                    ))
                }
            </ScrollView>
        </View>
    );
}

export default SearchChatBar;