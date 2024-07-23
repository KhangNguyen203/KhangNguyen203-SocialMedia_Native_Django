import { View, Button, ActivityIndicator } from 'react-native';
import API, { endpoints } from '../../configs/API';
import { useContext, useEffect, useState } from 'react';

import Post from './Post';
import Context from '../../configs/Context';

const PostProfile = ({ userID }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useContext(Context);

  useEffect(() => {
    const loadPost = async () => {
      try {
        let res = await API.get(endpoints['postsUser'](userID));
        setPosts(res.data);
      } catch (ex) {
        // console.error(ex);
      }
    };
    loadPost();
  }, [userID, loading]);

  return (
    <View>
      {posts === null ? <ActivityIndicator />: (
        <View>
          {posts.map( p => (
            <Post post={p}/>
          ))}
        </View>
      )}
    </View>
  );
};

export default PostProfile;