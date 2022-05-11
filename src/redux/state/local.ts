
export interface SLocal {
  token: string,
  collapsed: boolean,
}
export type TLocal = 'token' | 'collapsed';
let local: SLocal = {
  token: "cicaba",
  collapsed: false,
}
export default local