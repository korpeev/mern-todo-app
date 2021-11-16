export default interface IFormUserState {
  username: IUserValue,
  email: IUserValue,
  password: IUserValue
}

interface IUserValue {
  value: string,
  errorText: string,
  dirty: boolean
}