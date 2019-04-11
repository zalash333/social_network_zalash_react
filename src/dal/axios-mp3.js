import * as axios2 from "axios";

const axiosMp3 = axios2.create({
    baseURL: 'http://ol.mp3party.net/',
    //baseURL: 'http://localhost:54463/api/1.0/',
    withCredentials: true
    /* other custom settings */
});

export default axiosMp3;