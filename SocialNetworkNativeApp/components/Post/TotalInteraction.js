import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import API, { endpoints } from '../../configs/API';
import { StyleSheet } from 'react-native';
import Context from '../../configs/Context';

const TotalInteraction = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [shares, setShares] = useState([]);
    const [loading, setLoading] = useContext(Context);

    useEffect(() => {
        getComments();
        getLikes();
        getShares();
    }, [loading]);

    const getComments = async () => {
        try {
            const res = await API.get(endpoints.comments(post.id));
            setComments(res.data);
        } catch (ex) {
            console.error(ex);
        }
    };

    const getLikes = async () => {
        try {
            const res = await API.get(endpoints.likes(post.id));
            setLikes(res.data);
        } catch (ex) {
            console.error(ex);
        }
    };

    const getShares = async () => {
        try {
            const res = await API.get(endpoints.shares(post.id));
            setShares(res.data);
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <View style = {styles.container}>
            {likes.length !== 0 ? (
                <View style = {[ styles.leftView, {left: 10}]}>
                    <Image source={require('../../Icons/good-icon.png')} style={{height: 20,width: 20}} />
                    <Text style = {styles.text}> {likes.length}</Text>
                </View>
            ) : (
                <View style = {[styles.leftView]}/>
            )}
            <View style = {[ styles.rightView]}>
                
                {comments.length !== 0 && shares.length === 0? 
                    <Text style={[styles.text, {marginLeft: 90}]}>{comments.length} bình luận</Text>
                :(
                      
                    comments.length !== 0 ?(
                        <Text style={[styles.text, {marginRight: 10}]}>{comments.length} bình luận</Text>
                    ) : (
                        <View style={{marginRight: 70}}/>
                    )

                )}

               

                {shares.length !== 0 ? (
                    <Text style = {styles.text}>{shares.length} lượt chia sẻ</Text>
                ) : (
                    <View/>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 3
    },
    leftView: {
        flex: 1,
        flexDirection: "row",
    },
    rightView: {
        flex: 1,
        flexDirection: "row",
    },
    text: {
      color: "#777777",
    },
})

export default TotalInteraction;