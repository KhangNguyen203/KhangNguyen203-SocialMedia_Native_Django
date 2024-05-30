const MyUserReducer = (currenState, action) => {
    switch (action.type) {
        case 'login':{
            //action.payload: thong tin user dang dang nhap
            return action.payload;
        }
        case 'logout':{
            return null;
        }
    }

    return currenState;
}

export default MyUserReducer;