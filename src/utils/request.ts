import axios from 'axios'
import { AxiosResponse } from 'axios'
let loading: { close(): void }
let urls: Array<any> = []
// 创建 axios 实例

const request = axios.create({
    // API 请求的默认前缀
    baseURL: import.meta.env.VITE_APP_API_BASE_URL as string,
    timeout: 60000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error: { message: string, request: AxiosResponse | any, config: IObject<any> }) => {
    // const { getStatus, logout } = useLayoutStore()
    // loading.close()
    console.log(`err${error}`)
    if (error.request.status === 401) {
        let title = '请求失败'
        // if (getStatus.ACCESS_TOKEN) {
        //     logout()
        // }
        // ElNotification({
        //     title,
        //     message: "身份认证失败",
        //     type: 'error'
        // })
    } else {
        if (error.request.responseText) {
            let data = JSON.parse(error.request.responseText)
            // ElNotification({
            //     title: '提示',
            //     message: data.message,
            //     type: 'error'
            // })
        } else {
            // ElNotification({
            //     title: '提示',
            //     message: "请求超时",
            //     type: 'error'
            // })
            // logout()
        }

    }
    urls.splice(urls.findIndex(v => v === error.config.url), 1)
    if (urls.length === 0) {
        // loading.close()
    }
    return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config) => {
    // const { getStatus } = useLayoutStore()
    // if (urls.length === 0) {
    //     loading = ElLoading.service({
    //         lock: true,
    //         text: 'Loading',
    //         spinner: 'el-icon-loading',
    //         background: 'rgba(0, 0, 0, 0.4)'
    //     })
    // }
    if (!urls.includes(config.url)) {
        urls.push(config.url)
        // }
        // const token = getStatus.ACCESS_TOKEN
        // 如果 token 存在
        // 让每个请求携带自定义 token 请根据实际情况自行修改
        // if (token) {
        //     config.headers['Access-Token'] = token
    }
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response: AxiosResponse<IResponse>) => {
    const { data, config } = response
    urls.splice(urls.findIndex(v => v === config.url), 1)
    if (urls.length === 0) {
        // loading.close()
    }

    if (!data.success && data.hasOwnProperty("success")) {
        let title = '请求失败'
        // ElNotification({
        //     title,
        //     message: data.message,
        //     type: 'error'
        // })
        return Promise.reject(new Error(data.msg || 'Error'))
    }
    return response
}, errorHandler)

export default request