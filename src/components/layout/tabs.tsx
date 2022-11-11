import { FC, Fragment, useEffect, useState } from "react";
import { Menu, Dropdown, Space, } from "antd"
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppstoreOutlined, SyncOutlined, CloseOutlined } from '@ant-design/icons'
import { Tabs } from 'antd';
import { TileRouter } from '@/redux/state/common'
interface Connect {
  setTabName(data: string[]): void,
  setRefresh(parms: boolean): void,
}
interface Props extends Connect {
  setSelectedKeys(parms: string[]): void,
  setOpenKeys(parms: string[]): void,
  tileRouter: TileRouter[],
  collapsed: boolean,
  refresh: boolean,
  menuItem: {
    name: string,
    path: string,
  }
}
const { TabPane } = Tabs;
const items = [
  {
    icon: <SyncOutlined />,
    label: "刷新",
    key: 'refresh'
  },
  {
    icon: <CloseOutlined />,
    label: "关闭其他",
    key: 'closeOther'
  },
  {
    icon: <CloseOutlined />,
    label: "关闭全部",
    key: 'closeAll'
  },
]

const tabs: FC<Props> = (props) => {
  const [activeKey, setActiveKey] = useState("index")
  const [tabPane, setTabPane] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if (props.menuItem.path !== 'index' && props.menuItem.name && !tabPane.find(v => v.props.tab === props.menuItem.name)) {
      tabPane.push(<TabPane tab={props.menuItem.name} key={props.menuItem.path} />)
      setTabPane(tabPane)
    }
    setActiveKey(props.menuItem.path)
  }, [props.menuItem])

  const dealWithTab = (activeKey: string) => {
    const obj = props.tileRouter.find(v => v.path === activeKey)
    let path: string[] = []
    let tabName: string[] = []
    const parentRoute = (route: TileRouter) => {
      path.push(route.path)
      tabName.push(route.name)
      let obj = props.tileRouter.find(v => v.path === route.parentPath)
      if (obj) {
        parentRoute(obj)
      }
    }
    parentRoute(obj)
    path.reverse()
    tabName.reverse()
    return {
      path,
      tabName,
      item: obj
    }
  }
  const TabsChange = (activeKey: string) => {
    setActiveKey(activeKey)
    props.setSelectedKeys([activeKey])
    const { path, tabName, item } = dealWithTab(activeKey)
    if (item.parentPath) {
      if (!props.collapsed) {
        props.setOpenKeys([item.parentPath])
      }
      navigate(path.join('/'))
      props.setTabName(tabName)
    } else {
      props.setTabName([item.name])
      navigate(activeKey)
    }
  }
  const tabEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      if (tabPane.length === 1) {
        setTabPane([])
        navigate("/index")
        props.setSelectedKeys(['index'])
        setActiveKey('index')
      } else {
        let obj = tabPane[tabPane.length - 2]
        let tabObj = dealWithTab(obj.key)
        navigate(tabObj.path.join('/'))
        props.setSelectedKeys(tabObj.path)
        setActiveKey(obj.key)
        setTabPane(tabPane.filter(v => v.key !== targetKey))
        props.setTabName(tabObj.tabName)
      }
    }
  }
  const refresh = (obj: IAny) => {
    if (obj.key === "refresh") {
      props.setRefresh(false)
      setTimeout(() => {
        props.setRefresh(true)
      }, 100)
    } else if (obj.key === 'closeOther') {
      setTabPane(tabPane.filter(v => v.key === activeKey))
    } else {
      setTabPane([])
      props.setSelectedKeys(['index'])
      props.setOpenKeys([])
      props.setTabName(['首页'])

    }
  }
  return (
    <Fragment>
      <div className="tabs h-12 px-4 bg-white flex items-center justify-between" >
        <div className="tabs-content">
          <Tabs activeKey={activeKey} onEdit={tabEdit} onChange={TabsChange} type="editable-card" hideAdd>
            <TabPane tab="首页" key="index">
            </TabPane>
            {tabPane}
          </Tabs>
        </div>
        <div className="tabs-mor w-7">
          <Dropdown overlay={<Menu onClick={refresh} items={items}></Menu>} className="pl-2" getPopupContainer={() => document.querySelector('.tabs-mor')}>
            <Space className='coperate-btn min-w-max'>
              <AppstoreOutlined className='text-lg leading-3 cursor-pointer text-gray-500' />
            </Space>
          </Dropdown>
        </div>
      </div>
    </Fragment >
  )
}
export default connect(
  (state: IConnect<Props>) => ({ tileRouter: state.common.tileRouter, collapsed: state.local.collapsed, refresh: state.common.refresh }),
  (dispatch): Connect => ({
    setTabName(data: string[]) {
      dispatch({
        type: 'tabName', state: data
      })
    },
    setRefresh(data: boolean) {
      dispatch({
        type: 'refresh', state: data
      })
    }
  })
)(tabs)
