export default [
  {
    path: "/",
    name: "index",
    hidden: true,
    redirect: "/index",
    icon: "",
  },
  {
    path: "/login",
    name: "登录",
    hidden: true,
    redirect: "",
    icon:null,
    element: 'login',
  },
  {
    path: "*",
    name: "404",
    hidden: true,
    icon: null,
    redirect:"/404"
  }
]