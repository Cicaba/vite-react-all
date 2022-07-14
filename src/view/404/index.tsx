import { FC } from "react"
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
const err404 = new URL('../../assets/img/404/404.png', import.meta.url).href
const errCloud = new URL('../../assets/img/404/404_cloud.png', import.meta.url).href
const E404: FC = () => {
  const navigate= useNavigate()
  return (
    <div className='404 h-full flex items-center justify-center'>
      <div className='wscn-http404 flex '>
        <div className='pic-404'>
          <img className='pic-404__parent' src={err404} alt='404' />
          <img className='pic-404__child left' src={errCloud} alt='404' />
          <img className='pic-404__child mid' src={errCloud} alt='404' />
          <img className='pic-404__child right' src={errCloud} alt='404' />
        </div>
        <div className='bullshit'>
          <div className='bullshit__oops'>你访问的页面不存在!</div>
          <div className='bullshit__info'>
            All rights reserved
            <a className='bullshit__info-link' href='https://www.cicaba.cn' target='_blank'>Cicaba</a>
          </div>
          <div className='bullshit__headline'>
            你访问的地址不正确
          </div>
          <div className='bullshit__info'>
            请检查您输入的URL是否正确，或单击下面的按钮返回主页。
          </div>
          <Button type="primary" onClick={() => navigate('/')}>返回首页</Button>
        </div>
      </div>
    </div>
  )
}

export default E404