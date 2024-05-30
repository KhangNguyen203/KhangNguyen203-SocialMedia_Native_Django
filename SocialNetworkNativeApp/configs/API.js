import axios from "axios";
import {LOCALHOST} from './Constant'

export const endpoints = {
    'posts': '/posts/',
    'listUsers': '/users/',
    'postsUser': (userID) => `/users/${userID}/posts/`,
    'users': (userID) => `/users/${userID}/`, 
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'imgPosts': (postID) => `/posts/${postID}/imagePosts/`,
    'FriendShip': (user_one, user_two) => `/friendship/get_friendship/?user1_id=${user_one}&user2_id=${user_two}`,
    'addFriendShip': '/FriendShips/',
    'deleteFriendShip': (friendShipID) => `/FriendShips/${friendShipID}/`,
    'updateFriendShipPath': (friendShipID) => `/FriendShips/${friendShipID}/`,
    'register': '/users/',
    'comments': (postID) => `/posts/${postID}/comments/`,
    'likes': (postID) => `/posts/${postID}/likes/`,
    'shares': (postID) => `/posts/${postID}/shares/`,
    'add-comments':'/comments/',
    'add-like': '/likes/',
    'get-like': (postID, userID) => `/likes/get_like/?post=${postID}&user=${userID}`,
    'delete-like': (likeID) =>`/likes/${likeID}/`,
    'getPostByID': (postID) => `/posts/${postID}/`, 
    'deletePostByID': (postID) => `/posts/${postID}/`, 
    'addShare': '/sharePosts/',
    'getSharePostsByUserID':(userID) => `users/${userID}/sharePosts/`,
    'add_image': '/imagePosts/',
    'add-notification': '/Notifications/',
    'delete-notification': (noID) =>`/Notifications/${noID}/`,
    'get-notification-by-userID': (userID) => `Notifications/get_notification/?userID=${userID}`,
    'search_users': (username) => `/users/search_users/?username=${username}`,
    'get_user_by_email': (email) => `/users/get_user_by_email/?email=${email}`,
}

export const authApi = (accessToken) => axios.create({
    baseURL: LOCALHOST,
    headers: {
        "Authorization": `bearer ${accessToken}`
    }
})

export {LOCALHOST}
  
export default axios.create({
    baseURL: LOCALHOST
})
