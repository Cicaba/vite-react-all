import asyncRoute from "@/routes/asyncRoute"

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
let routes: IRoutes[] = asyncRoute;
export default routes