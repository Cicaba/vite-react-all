import React, { FC, Fragment } from 'react'

// import { connect } from 'react-redux';
import { SCommon } from '@/redux/state/common'
// import api from '@/api'
// import { useEffect } from 'react'
import './layout.less'
import Comprehensive from './comprehensive'
interface IProps extends SCommon {
  // setToken: Function,
  // setMenu: Function,
  // setRouter: Function,
}
const layout: FC<IProps> = (props) => {
  // useEffect(() => {
  // api.getMenu().then(res => {
  // props.setMenu(res.data.data);
  // props.setRouter(res.data.data);
  //   })
  // })
  return (
    <Fragment>
      <Comprehensive ></Comprehensive>
    </Fragment>
  )
}

// export default connect(
//   (state: IConnect<SHome>) => ({}),
//   (dispatch) => ({
// setToken(data: string) {
//   dispatch({ type: 'token', state: data })
// },
// setMenu(data: string) {
//   dispatch({ type: 'menu', state: data })
// },
// setRouter(data: string) {
//   dispatch({ type: 'router', state: data })
// }
//   })
// )(Home)
export default layout