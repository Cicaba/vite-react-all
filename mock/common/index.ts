import { MockMethod } from 'vite-plugin-mock'
export default [
  {
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
          }
        ],
        msg: ''
      }
    },
  },
] as MockMethod[]
