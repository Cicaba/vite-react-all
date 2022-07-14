import axios from 'axios'
import { AxiosResponse } from 'axios'
import store from '@/redux/index'
import { message } from 'antd';
let urls: Array<any> = []
// 创建 axios 实例

const request = axios.create({
    // API 请求的默认前缀
    baseURL: import.meta.env.VITE_APP_API_BASE_URL as string,
    timeout: 60000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error: { message: string, request: AxiosResponse | any, config: IObject<any> }) => {
    store.dispatch({
        type: 'spinning',
        state: false
    })
    console.log(`err${error}`)
    if (error.request.status === 401) {
        // if (getStatus.ACCESS_TOKEN) {
        //     logout()
        // }
        message.error('身份认证失败');
    } else {
        if (error.request.responseText) {
            let data = JSON.parse(error.request.responseText)
            message.error(data.message);
        } else {
            message.error('请求超时');
            // logout()
        }

    }
    urls.splice(urls.findIndex(v => v === error.config.url), 1)
    if (urls.length === 0) {
        store.dispatch({
            type: 'spinning',
            state: false
        })
    }
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config) => {
    store.dispatch({
        type: 'spinning',
        state: true
    })
    if (!urls.includes(config.url)) {
        urls.push(config.url)
        const token = store.getState().local.token
        // 如果 token 存在
        // 让每个请求携带自定义 token 请根据实际情况自行修改
        if (token) {
            config.headers['Access-Token'] = token
        }
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response: AxiosResponse<IResponse>) => {
    const { data, config } = response
    urls.splice(urls.findIndex(v => v === config.url), 1)
    if (urls.length === 0) {
        store.dispatch({
            type: 'spinning',
            state: false
        })
    }
    if (!data.success && data.hasOwnProperty("success")) {
        let title = '请求失败，'
        message.error(title+data.message);
        return Promise.reject(new Error(data.message || 'Error'))
    }
    return response
}, errorHandler)

export default request