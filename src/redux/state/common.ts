
export interface TileRouter {
  path: string,
  name: string,
  title?: string,
  hidden: Boolean,
  redirect?: string,
  icon?: string,
  element?: string | Function,
  parentPath: string,
}
export interface SearchList {
  label: string,
  value: string
}
export interface SCommon {
  tabName: string[],
  userInfo: IAny,
  tileRouter: TileRouter[],
  full: boolean,
  searchList: SearchList[],
  menuItems: [],
  refresh: boolean,
  spinning: boolean

}
export type TCommon = 'userInfo' | 'tileRouter' | 'tabName' | 'full' | 'searchList' | 'menuItems' | 'refresh' | 'spinning';
let common: SCommon = {
  userInfo: {},
  tabName: [],
  tileRouter: [],
  full: false,
  refresh: true,
  spinning: false,
  searchList: [],
  menuItems: [],
}
export default common