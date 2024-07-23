import { useRef, useState } from "react";
import API, { endpoints } from "./API";
import SimpleToast from 'react-native-simple-toast';



const LOCALHOST = "http://192.168.2.5:8000";
const NAMEAPP = "Social Media";
const ICONSIZE =  20;
const TIMELOADFRIENDSTATUS = 5000;
const BACKGROUNDCOLOR = "#DDDDDD";


const CreateNotification = async (loai, nguoiTH, nguoiNhan, nDung, baiViet) => {
    try {
        let data = {
            "content": nDung,
            "active": true,
            "typeNoti": loai,
            "userMake": nguoiTH,
            "user": nguoiNhan,
            "post": loai === 1 ? null : baiViet
        };
        let res = await API.post(endpoints["add-notification"], data);
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
};

const DeleteNotification = async (notificationID) => {
    try {
        let res = await API.delete(endpoints["delete-like"](liked.id));
        // console.log("xoa thanh cong");
        // console.log(res.data);
    } catch (error) {
        console.error(error);
    }
}

const UpdatingFunction = () => {
    SimpleToast.show("Tính năng sắp được ra mắt");
}

export {LOCALHOST, NAMEAPP, ICONSIZE, BACKGROUNDCOLOR, CreateNotification, DeleteNotification, UpdatingFunction}
