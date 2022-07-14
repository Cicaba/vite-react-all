import { FC, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button, Checkbox, Form, Input } from 'antd'
import api from '@/api'
interface Connect{
  setUserInfo(data: IAny): void,
  setToken(data: number| string): void,
  setUserName(data: string): void,
  setRemember(data: boolean): void,
}
interface Props extends Connect {
  remember:boolean,
  userName:string
}

const title = import.meta.env.VITE_APP_TITLE
const copyright = import.meta.env.VITE_APP_COPYRIGHT
const login: FC<Props> = (props) => {
  let  navigate =  useNavigate()
  let [loading, setLoading] = useState(false);
  const onFinish = (values: IAny) => {
    setLoading(true)
    api.login(values).then((res) => {
      props.setUserInfo(res.data.data)
      props.setToken(res.data.data.token)
      navigate('/')
      if (props.remember) {
        props.setUserName(values.username)
      } else {
        props.setUserName('')
      }
    }).finally(() => { setLoading(false); });
  };
  return (
    <>
      <div className="login h-full bg-cover flex items-center">
        <Row>
          <Col span="8" offset="16">
            <div className="form-box shadow-lg bg-gray-100 rounded-lg p-4" >
              <div className="text-center text-2xl pb-4">{title}</div>
              <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={{ username: props.userName, password: 123456 }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="用户名称："
                  name="username"
                  rules={[{ required: true, message: '用户名必填!' }]}
                >
                  <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '密码必填!' }]}
                >
                  <Input.Password placeholder="请输入密码" />
                </Form.Item>

                <div className="flex justify-center">
                  <div className="pb-4 w-4/5 ">
                    <Checkbox checked={props.remember} onChange={()=>props.setRemember(!props.remember)}>记住用户名</Checkbox>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button type="primary" loading={loading} className="w-4/5" htmlType="submit">
                    登录
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <footer className="text-center w-full fixed bottom-4 text-gray-200">
        {copyright}
      </footer>
    </>
  )
}

export default connect(
  (state: IConnect<Props>) => ({ remember: state.local.remember, userName:state.local.userName }),
  (dispatch): Connect => ({
    setUserInfo(data: IAny) {
      dispatch({
        type: 'userInfo', state: data
      })
    },
    setToken(data: number | string) {
      dispatch({
        type: 'token', state: data
      })
    },
    setRemember(data: boolean) {
      dispatch({
        type: 'remember', state: data
      })
    },
    setUserName(data: string) {
      dispatch({
        type: 'userName', state: data
      })
    },
  })
)(login)