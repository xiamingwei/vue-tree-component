import axios from 'axios'
import iView from 'iview'
import { EncodeGetUrl } from '@/common/util'
import './interceptor.js'

let httpMethod = {
    postService: (url, data, config = {}, no_loading = false) => {
        return new Promise((resolve, reject) => {
            !no_loading && iView.LoadingBar.start()
            axios
                .post(url, data, config)
                .then((response) => {
                    if (response.data) {
                        resolve(response.data)
                        !no_loading && iView.LoadingBar.finish()
                    }
                })
                .catch((error) => {
                    reject({
                        'response_code': '500',
                        'response_msg': '网络错误'
                    })
                    !no_loading && iView.LoadingBar.error()
                })
            })
    },

    putService: (url, data, config = {}, no_loading = false) => {
        return new Promise((resolve, reject) => {
            !no_loading && iView.LoadingBar.start()
            axios
                .put(url, data, config)
                .then((response) => {
                    if (response.data) {
                        resolve(response.data)
                        !no_loading && iView.LoadingBar.finish()
                    }
                })
                .catch((error) => {
                    reject({
                        'response_code': '500',
                        'response_msg': '网络错误'
                    })
                    !no_loading && iView.LoadingBar.error()
                })
            })
    },

    getService: (url, config = {}, no_loading = false) => {
        url = EncodeGetUrl(url)
        return new Promise((resolve, reject) => {
            !no_loading && iView.LoadingBar.start()
            axios
                .get(url, config)
                .then((response) => {
                    if (response.data) {
                        resolve(response.data)
                        !no_loading && iView.LoadingBar.finish()
                    }
                }).catch((error) => {
                    reject({
                        "response_code": "500",
                        "response_msg": "网络错误"
                    })
                    !no_loading && iView.LoadingBar.error()
                    })
            })
    },

    deleteService: (url, config = {}, no_loading = false) => {
        return new Promise((resolve, reject) => {
            !no_loading && iView.LoadingBar.start()
            axios
                .delete(url, config)
                .then((response) => {
                    if (response.data) {
                        resolve(response.data)
                        !no_loading && iView.LoadingBar.finish()
                    }
                }).catch((error) => {
                    reject({
                        "response_code": "500",
                        "response_msg": "网络错误"
                    })
                    !no_loading && iView.LoadingBar.error()
                })
            })
    },
  
    getDownloadFile(url, name) {
        axios({
            method: 'get',
            url: url,
            responseType: 'blob'
        }).then((res) => {
            let url = window.URL.createObjectURL(res.data);
            let link = document.createElement('a');
            link.href = url;
            //火狐下会乱码,重新命名
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }
}


export default httpMethod