
export interface SLocal {
  token: string,
  collapsed: boolean,
  remember: boolean,
  userName: string,
  userInfo:IAny
}
export type TLocal = 'token' | 'collapsed' | 'userInfo' | 'userName' | 'remember';
let local: SLocal = {
  token: "cicaba",
  collapsed: false,
  remember: false,
  userInfo: {},
  userName: ""

}
export default local