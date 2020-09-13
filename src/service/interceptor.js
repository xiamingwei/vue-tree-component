import axios from 'axios'

// http request 拦截器
axios.interceptors.request.use(
    config => {
       return config;
    },
    err => {
       return Promise.reject(err);
    }
 )

axios.interceptors.response.use(
    response => {
       return response;
    },
    error => {
        return Promise.reject(error.response.data)
    }
)