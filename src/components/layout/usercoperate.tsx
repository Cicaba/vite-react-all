import { Fragment, FC, useState, useRef, useEffect } from 'react';
import { Avatar, Menu, Dropdown, Space, Badge, Input, InputRef, Popover, Select, AutoComplete, Button } from 'antd'
import { connect } from 'react-redux'
import { SearchList } from '@/redux/state/common'
import { DownOutlined, FullscreenOutlined, BellOutlined, SearchOutlined, SettingOutlined, PoweroffOutlined, FullscreenExitOutlined } from '@ant-design/icons';
interface Connect {
  setFull(data: boolean): void,
}
interface Props extends Connect {
  toRoute(keyPaths: { keyPath: string[] }): void,
  full: boolean,
  searchList: SearchList[]
}
const items = [
  {
    icon: <SettingOutlined />,
    label: "设置中心",
    key: 'setting'
  },
  {
    icon: <PoweroffOutlined />,
    label: "注销登录",
    key: 'outlined'
  },
]
const menu = (
  <Menu items={items}></Menu>
);
const usercoperate: FC<Props> = (props) => {
  const [search, setSearch] = useState(false)
  const [path, setPath] = useState(null)
  const changeFullScreen = () => {
    const element = document.documentElement
    // 如果是全屏状态
    if (props.full) {
      // 如果浏览器有这个Function
      // if (document.exitFullscreen) {
      document.exitFullscreen()
      // } else if (document.webkitCancelFullScreen) {
      //   document.webkitCancelFullScreen()
      // } else if (document.mozCancelFullScreen) {
      //   document.mozCancelFullScreen()
      // } else if (document.msExitFullscreen) {
      //   document.msExitFullscreen()
      // }
    } else {
      // 如果浏览器有这个Function
      // if (element.requestFullscreen) {
      element.requestFullscreen()
      // } else if (element.webkitRequestFullScreen) {
      //   element.webkitRequestFullScreen()
      // } else if (element.mozRequestFullScreen) {
      //   element.mozRequestFullScreen()
      // } else if (element.msRequestFullscreen) {
      //   element.msRequestFullscreen()
      // }
    }
    props.setFull(!props.full)
  }
  const msgContent = (
    <Fragment>
      <div className='flex items-center m-4'>
        <div className="w-12 h-12 flex  items-center">
          <Avatar size={38} src="https://joeschmoe.io/api/v1/random"></Avatar>
        </div>
        <div className='flex-grow '>
          当前是开发版，为完成基础搭建。后续将逐步更新。。。
        </div>
        <div >
          <Button type="dashed">详情</Button>
        </div>
      </div>
      <div className='flex items-center m-4'>
        <div className="w-12 h-12 flex  items-center">
          <Avatar size={38} src="https://joeschmoe.io/api/v1/random"></Avatar>
        </div>
        <div className='flex-grow '>
          当前是开发版，为完成基础搭建。后续将逐步更新。。。
        </div>
        <div >
          <Button type="dashed">详情</Button>
        </div>
      </div>    <div className='flex items-center m-4'>
        <div className="w-12 h-12 flex  items-center">
          <Avatar size={38} src="https://joeschmoe.io/api/v1/random"></Avatar>
        </div>
        <div className='flex-grow '>
          当前是开发版，为完成基础搭建。后续将逐步更新。。。
        </div>
        <div >
          <Button type="dashed">详情</Button>
        </div>
      </div>
    </Fragment>
  )
  const searchList = () => {
    return props.searchList.map(v => (<Select.Option key={v.value} value={v.value}>{v.label}</Select.Option>))
  }
  const toPage = (value: string) => {
    setSearch(false)
    let arr = value.split('/').filter(v => v).reverse()
    props.toRoute({ keyPath: arr })
  }
  return (
    <Fragment>

      <Select
        showArrow={false}
        showSearch
        placeholder="菜单检索"
        optionFilterProp="children"
        bordered={false}
        value={path}
        onChange={toPage}
        onBlur={() => { setSearch(false) }}
        className={search ? 'block select-search-width' : 'hidden select-search-width'}
        filterOption={(input, option: IAny) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {searchList()}
      </Select>
      <SearchOutlined onClick={() => {
        setSearch(!search);
      }} className='text-xl leading-4  cursor-pointer' />
      <Popover content={msgContent} title="通知">
        <Badge count={5} className="pl-2">
          <BellOutlined className='text-xl leading-4  cursor-pointer' />
        </Badge>
      </Popover>
      {
        props.full ?
          <FullscreenExitOutlined onClick={changeFullScreen} className='text-xl leading-4 pl-4 cursor-pointer' />
          :
          <FullscreenOutlined onClick={changeFullScreen} className='text-xl leading-4 pl-4 cursor-pointer' />
      }
      <div className='user-dropdown flex items-center pl-2'>
        <Avatar size={42} src="https://joeschmoe.io/api/v1/random" />
        <Dropdown overlay={menu} className="pl-2" getPopupContainer={() => document.querySelector('.coperate-btn')}>
          <Space className='coperate-btn min-w-max'>
            易大师
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </Fragment>
  );
}
export default connect(
  (state: IConnect<Props>) => ({ full: state.common.full, searchList: state.common.searchList }),
  (dispatch): Connect => ({
    setFull(data: boolean) {
      dispatch({
        type: 'full', state: data
      })
    },
  })
)(usercoperate)