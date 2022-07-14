import request from '@/utils/request'
import { AxiosResponse } from 'axios'
const api = {
  getMenu: '/mock/api/common/getMenu',
  login: '/mock/api/common/login',
}
export const login = (data:IAny): Promise<AxiosResponse<IResponse>> => {
  return request({
    method: "post",
    url: api.login,
    data
  })
}
export const getMenu = (): Promise<AxiosResponse<IResponse>> => {
  return request({
    method: "get",
    url: api.getMenu,
  })
} 