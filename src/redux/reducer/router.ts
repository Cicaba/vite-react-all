import Routes, { IRoutes, TRoutes } from '@/redux/state/router'
import React from 'react'
// 动态路由名称映射表
const modules = import.meta.glob('../../view/**/**.tsx')
const element: IObject<React.LazyExoticComponent<any>> = {
  layout: React.lazy(() => import('@/components/layout/index')),
}
Object.keys(modules).forEach(key => {
  const nameMatch = key.match(/^\.\.\/\.\.\/view\/(.+)\.tsx/)
  if (!nameMatch) return
  // 排除_Components文件夹下的文件
  if (nameMatch[1].includes('_Components')) return
  // 如果页面以Index命名，则使用父文件夹作为name
  const indexMatch = nameMatch[1].match(/(.*)\/index$/i)
  let name = indexMatch ? indexMatch[1] : nameMatch[1];
  [name] = name.split('/').splice(-1)
  element[name] = React.lazy(modules[key])
})
interface IAction {
  type: TRoutes,
  state: IRoutes[]
}
const setRouteElement = (router: IRoutes[]) => {
  return router.map((items: IRoutes): IRoutes => {
    if (items.children && items.children.length) {
      return {
        ...items,
        children: setRouteElement(items.children)
      }
    } else {
      return {
        ...items,
        element: element[items.element]
      }
    }
  })
}
const setRouter = (state: IRoutes[] = Routes, action: IAction): IRoutes[] => {
  if (action.type !== 'router') return state
  let menuItem = setRouteElement(action.state)
  return [
    ...state,
    {
      path: "/",
      name: "layout",
      hidden: false,
      redirect: "",
      icon: "",
      element: element.layout,
      children: menuItem
    }
  ]
}
export default setRouter