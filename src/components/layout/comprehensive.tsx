import React, { FC, Fragment, useEffect, useState } from "react";
import { Layout, Breadcrumb, Row, Col, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import Tabs from './tabs'
import { SCommon } from '@/redux/state/common'
import { SLocal } from '@/redux/state/local'
import Usercoperate from './usercoperate'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;
/**
 * @description 分发redux
 * @author Cicaba
 * @date 25/04/2022
 * @interface Connect
 */

interface Connect {
  setCollapsed(data: boolean): void,
  setTabName(data: string[]): void,
}
interface Props extends Connect, SCommon, SLocal {
  refresh: boolean
}

/**
 * @description 横向布局
 * @author Cicaba
 * @date 24/04/2022
 * @param {*} props
 */

const comprehensive: FC<Props> = (props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState([])
  const [openKeys, setOpenKeys] = useState([])
  const [nowOpenKeys, setNowOpenKeys] = useState([])
  const [menuItem, setMenuItem] = useState({ name: null, path: null })
  useEffect(() => {
    let tabNames: string[] = [];
    const keyPath = location.pathname.split('/');
    keyPath.splice(0, 1)
    setSelectedKeys(keyPath)
    // let menuObj = props.tileRouter.find(v => v.path === keyPath[keyPath.length - 1])
    // setMenuItem({ name: menuObj.name, path: menuObj.path })
    setMenuItem(props.tileRouter.find(v => v.path === keyPath[keyPath.length - 1]))
    if (!props.collapsed) {
      setOpenKeys(keyPath)
      setNowOpenKeys(keyPath)
    }
    keyPath.forEach((path: string) => {
      tabNames.push(props.tileRouter.find(v => v.path === path).name)
    })
    props.setTabName(tabNames)
  }, [])
  /**
   * @description 菜单点击跳转
   * @author Cicaba
   * @date 28/04/2022
   * @param {*} { item, key, keyPath, domEvent }
   */
  const toRoute = ({ keyPath }: IAny) => {
    setMenuItem(props.tileRouter.find(v => v.path === keyPath[0]))
    setSelectedKeys(keyPath)
    if (keyPath.length === 1) {
      setNowOpenKeys([])
    }
    let tabNames: string[] = [];
    keyPath.forEach((path: string) => {
      tabNames.push(props.tileRouter.find(v => v.path === path).name)
    })
    tabNames.reverse()
    props.setTabName(tabNames)
    let path = "/" + keyPath.reverse().join('/');
    navigate(path)
  }
  const openChange = (openKeys: string[]) => {
    if (openKeys.length) {
      setNowOpenKeys(openKeys)
    }
    setOpenKeys(openKeys)
  }
  const breadcrumbItem = () => {
    return props.tabName.map((v, i) => (<Breadcrumb.Item key={i}>{v}</Breadcrumb.Item>))
  }
  return (
    <Fragment>
      <Layout className="h-screen overflow-hidden">
        <Sider collapsed={props.collapsed}>
          <Menu onClick={toRoute} onOpenChange={openChange} selectedKeys={selectedKeys} openKeys={openKeys} items={props.menuItems} mode="inline" theme="dark" />
        </Sider>
        <Layout>
          <Header className="px-4 bg-white flex items-center border-gray-200 border-b">
            <Row >
              <Col span={12} className="flex items-center">
                {props.collapsed ?
                  <MenuUnfoldOutlined className="text-lg cursor-pointer leading-3" onClick={() => { props.setCollapsed(false); setTimeout(() => { setOpenKeys(nowOpenKeys) }, 100) }} />
                  :
                  <MenuFoldOutlined className="text-lg cursor-pointer leading-3" onClick={() => { setOpenKeys([]); props.setCollapsed(true) }} />
                }
                <Breadcrumb className="inline-block pl-2">
                  {breadcrumbItem()}
                </Breadcrumb>
              </Col>
              <Col span={12} className="flex justify-end items-center">
                <Usercoperate toRoute={toRoute}></Usercoperate>
              </Col>
            </Row>

          </Header>
          <Content>
            <Tabs menuItem={menuItem} setSelectedKeys={setSelectedKeys} setOpenKeys={setOpenKeys}></Tabs>
            <div className="m-4 page-main bg-white shadow">
              {props.refresh ? <Outlet /> : null}
            </div>
          </Content>
        </Layout>
      </Layout>

    </Fragment>
  )
}
export default connect(

  (state: IConnect<Props>) => ({ ...state.common, collapsed: state.local.collapsed, router: state.router, refresh: state.common.refresh }),
  (dispatch): Connect => ({
    setCollapsed(data: boolean) {
      dispatch({
        type: 'collapsed', state: data
      })
    },
    setTabName(data: string[]) {
      dispatch({
        type: 'tabName', state: data
      })
    }
  })
)(comprehensive)