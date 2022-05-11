import common, { SCommon, TCommon } from '@/redux/state/common'
interface IAction {
  type: TCommon,
  state: any
}
let setCommon = (state: SCommon = common, action: IAction) => {
  switch (action.type) {
    case 'full':
      return {
        ...state, [action.type]: action.state
      }
    case 'userInfo':
      return {
        ...state, [action.type]: action.state
      }
    case 'tileRouter':
      return {
        ...state, [action.type]: action.state
      }
    case 'tabName':
      return {
        ...state, [action.type]: action.state
      }
    case 'searchList':
      return {
        ...state, [action.type]: action.state
      }
    case 'menuItems':
      return {
        ...state, [action.type]: action.state
      }
    case 'refresh':
      return {
        ...state, [action.type]: action.state
      }
    default:
      return state
  }
}
export default setCommon