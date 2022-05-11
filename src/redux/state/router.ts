export interface IRoutes {
  path: string,
  name: string,
  title?: string,
  hidden: Boolean,
  redirect?: string,
  icon?: string,
  element?: Function | string | any,
  children?: IRoutes[]
}
export type TRoutes = 'router';
let routes: IRoutes[] = [
  {
    path: "/",
    name: "index",
    hidden: true,
    redirect: "/index",
    icon: "",
  },

];
export default routes