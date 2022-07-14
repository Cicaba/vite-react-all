import { Routes, Route, Navigate, Outlet, HashRouter as Router } from "react-router-dom";
import React, { FC, ReactNode, Suspense, useLayoutEffect, useState } from "react";
import { Provider } from "react-redux";
import store from '@/redux/index'
import api from '@/api'
import { Spin } from "antd"
import { IRoutes } from '@/redux/state/router'
import { tileRouter, copeWithSearchList, copeWithMenuItems } from "@/utils/router"
import { persistor } from "@/redux/index"
import { PersistGate } from 'redux-persist/lib/integration/react';
/**
 * @description 结构化路由
 * @author Cicaba
 * @date 20/04/2022
 */
const structured = (routers: IRoutes[]) => {
  return routers.map((route: IRoutes) => {
    if (route.children && route.children.length) {
      return (<Route key={route.name} path={route.path} element={element(route)}>
        {structured(route.children)}
      </Route>)
    } else {
      return (
        <Route key={route.name} path={route.path} element={element(route)}></Route>
      )
    }
  })
}
/**
 * @description 判断是否重定向，返回对应的组件
 * @author Cicaba
 * @date 20/04/2022
 */
const element = (route: IRoutes): ReactNode => {
  if (route.redirect) {
    return <Navigate to={route.redirect}></Navigate>
  } else {
    if (route.element) {
      return <Suspense fallback={<div className="flex items-center h-screen justify-center"><Spin /></div>}><route.element /></Suspense>
    } else {
      return <Outlet />
    }
  }
}
const AppRouter: FC = () => {
  const [route, setRoute] = useState([])
  useLayoutEffect(() => {
    api.getMenu().then(res => {
      const { data } = res.data;
    // let data = [
    //   {
    //     path: "index",
    //     name: "工作台",
    //     hidden: false,
    //     redirect: "",
    //     icon: "BarChartOutlined",
    //     element: 'workbench',
    //   },
    //   {
    //     path: "components",
    //     name: "组件",
    //     hidden: false,
    //     redirect: "",
    //     icon: "ClusterOutlined",
    //     children: [
    //       {
    //         path: "icon",
    //         name: "图标",
    //         hidden: false,
    //         redirect: "",
    //         icon: "BarChartOutlined",
    //         element: 'icon',
    //       },
    //       {
    //         path: "icon1",
    //         name: "图标1",
    //         hidden: false,
    //         redirect: "",
    //         icon: "BarChartOutlined",
    //         element: 'icon',
    //       },
    //       {
    //         path: "icon2",
    //         name: "图标2",
    //         hidden: false,
    //         redirect: "",
    //         icon: "BarChartOutlined",
    //         element: 'icon',
    //       }
    //     ]
    //   }
    // ]
    let tileData = tileRouter(data)
    store.dispatch({ type: 'tileRouter', state: tileData })
    store.dispatch({ type: 'router', state: data })
    store.dispatch({ type: 'menuItems', state: copeWithMenuItems(data) })
    store.dispatch({ type: 'searchList', state: copeWithSearchList(data) })
    // store.dispatch({ type: 'full', state: false })
      console.log(store.getState().router,structured(store.getState().router));
      
    setRoute(structured(store.getState().router))

    })
  }, [])
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Routes>
            {route}
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}
export default AppRouter