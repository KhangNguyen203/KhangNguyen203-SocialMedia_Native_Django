import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import API, { endpoints } from '../../configs/API';
import Post from './Post';

const PostShare2 = ({sharePosts}) => {
    const [post, setPost] = useState(null);


    useEffect(() => {
        const loadPosts = async () => {
            try {
                const postRes = await API.get(endpoints.getPostByID(sharePosts.post));
                setPost(postRes.data);
            } catch (ex) {
                console.error(ex);
            }
        };
        loadPosts();
    }, [sharePosts]);

    return (
        <View>
            <Post post={post}/>
        </View>
    );
}

export default PostShare2;
