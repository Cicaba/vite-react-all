import local, { SLocal, TLocal } from '@/redux/state/local'
interface IAction {
  type: TLocal,
  state: any
}
let setLocal = (state: SLocal = local, action: IAction) => {
  switch (action.type) {
    case 'collapsed':
      return {
        ...state, [action.type]: action.state
      }
    case 'token':
      return {
        ...state, [action.type]: action.state
      }
    case 'userInfo':
      return {
        ...state, [action.type]: action.state
      }
    case 'userName':
      return {
        ...state, [action.type]: action.state
      }
    case 'remember':
      return {
        ...state, [action.type]: action.state
      }
    default:
      return state
  }

}
export default setLocal