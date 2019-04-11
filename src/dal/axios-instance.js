import * as axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    //baseURL: 'http://localhost:54463/api/1.0/',
    withCredentials: true
    /* other custom settings */
});

export default axiosInstance;