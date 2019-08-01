import Cookies from 'js-cookie'

const TokenKey: string = 'ZYBUUAP'

export function getToken (): string | undefined {
  return Cookies.get(TokenKey)
}

export function setToken (token: string): void {
  Cookies.set(TokenKey, token)
}

export function removeToken (): void {
  Cookies.remove(TokenKey)
}
