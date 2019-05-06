import * as axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    //baseURL: 'http://localhost:54463/api/1.0/',
    withCredentials: true,
    /* other custom settings */
    headers: {
        'API-KEY': 'ad70eac8-7f08-4747-bd82-147498934536'
    }
});

export default axiosInstance;