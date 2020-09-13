import httpMethod from './method';

let { getService, postService, putService, deleteService, getDownloadFile } = httpMethod;


const dev_url = ''

/**
 * 对于FormData格式 请用qs.stringify(data)转化一次
 */

let request = {

    getData: () => getService('/data1')

}

export default request