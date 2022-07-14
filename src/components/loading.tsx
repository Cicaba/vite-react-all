import { Fragment, FC, ReactNode } from 'react'
import { Spin } from 'antd';
interface Props{
  children?:ReactNode,
  spinning: boolean
}
const Loading: FC<Props> = (props) => {
  const Child = props.children 
  return (
    <Fragment>
      <Spin wrapperClassName="h-full" spinning={props.spinning}>
          {Child}
        </Spin>
    </Fragment>
  )
}
Loading.defaultProps = {
  children:null,
  spinning:false
}
export default Loading