import { truncate } from 'fs'
import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    statusCode: 200,
    timeout: 1000,
    url: '/mock/api/common/getMenu',
    method: 'get',
    response: (): IResponse => {
      return {
        code: 200,
        success: true,
        data: [
          {
            path: "index",
            name: "工作台",
            hidden: false,
            redirect: "",
            icon: "BarChartOutlined",
            element: 'workbench',
          },
          {
            path: "components",
            name: "组件",
            hidden: false,
            redirect: "",
            icon: "ClusterOutlined",
            children: [
              {
                path: "icon",
                name: "图标",
                hidden: false,
                redirect: "",
                icon: "BarChartOutlined",
                element: 'icon',
              },
              {
                path: "icon1",
                name: "图标1",
                hidden: false,
                redirect: "",
                icon: "BarChartOutlined",
                element: 'icon',
              },
              {
                path: "icon2",
                name: "图标2",
                hidden: false,
                redirect: "",
                icon: "BarChartOutlined",
                element: 'icon',
              }
            ]
          },
          {
            path: "404",
            name: "404",
            hidden: true,
            redirect: "",
            icon: "",
            element: '404',
          }
        ],
        message: ''
      }
    },
  },
  {
    statusCode: 200,
    timeout: 4000,
    url: '/mock/api/common/login',
    method: 'post',
    response: (): IResponse => {
      return {
        code: 200,
        success: true,
        data: {
          username: "易大师",
          orgCode: 10000,
          token:new Date().getTime()
        },
        message: ''
      }
    },
  },
] as MockMethod[]
