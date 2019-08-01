interface UserInfo {
  memberId: number
  uName: string
  realName: string
  phone: string
  email: string
  employeeId: string
  datetime: string
  [propName: string]: string | number | boolean
}
