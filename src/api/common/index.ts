import request from '@/utils/request'
import { AxiosResponse } from 'axios'
const api = {
  getMenu: '/mock/api/common/getMenu'
}
export const getMenu = (): Promise<AxiosResponse<IResponse>> => {
  return request({
    method: "get",
    url: api.getMenu,
  })
} 