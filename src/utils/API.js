/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASEURL = "https://randomuser.me/api/?results=20";

export default {
    Employee: function (){
        return axios.get(BASEURL);
    }
};