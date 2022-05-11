import { TileRouter, SearchList } from '@/redux/state/common'
import { IRoutes } from '@/redux/state/router'
import * as Icon from '@ant-design/icons';
import React from 'react'
interface MenuItemType {
  icon?: React.ReactNode,
  label: string | React.ReactNode,
  key: string,
  title?: string
  disabled?: boolean,
}
export /**
 * @description 平铺路由数据
 * @author Cicaba
 * @date 05/05/2022
 * @param {IRoutes[]} router
 * @return {*}  {TileRouter[]}
 */
  const tileRouter = (router: IRoutes[]): TileRouter[] => {
    let tileRoute: TileRouter[] = []
    let copyRouter = JSON.parse(JSON.stringify(router))
    const recursion = (router: IRoutes[], parentPath: string = '') => {
      router.forEach((route: IRoutes) => {
        if (route.children && route.children.length) {
          recursion(route.children, route.path)
          delete route.children
          tileRoute.push({ ...route, parentPath: parentPath })
        } else {
          tileRoute.push({ ...route, parentPath: parentPath })
        }
      })
    }
    recursion(copyRouter)
    return tileRoute
  }
export const copeWithSearchList = (router: IRoutes[]): SearchList[] => {
  let searchList: SearchList[] = []
  const recursion = (router: IRoutes[], parentName: string = '', parentPath: string = '') => {
    router.forEach((item) => {
      if (item.children && item.children.length) {
        recursion(item.children, parentName + item.name, parentPath + '/' + item.path)
      } else {
        if (!item.hidden) {
          searchList.push({
            label: parentName ? parentName + '-' + item.name : item.name,
            value: parentPath ? parentPath + '/' + item.path : item.path
          })
        }
      }
    })
  }
  recursion(router)
  return searchList
}
export const copeWithMenuItems = (router: IRoutes[]): MenuItemType[] => {
  return router.map((item: IRoutes) => {
    if (item.children && item.children.length && !item.hidden) {
      return {
        icon: React.createElement(Icon[item.icon]),
        label: item.name,
        title: item.title,
        key: item.redirect ? item.redirect : item.path,
        children: copeWithMenuItems(item.children),
      }
    } else if (!item.hidden) {
      return {
        title: item.title,
        icon: React.createElement(Icon[item.icon]),
        label: item.name,
        key: item.redirect ? item.redirect : item.path,
      }
    }
  })
}