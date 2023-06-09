export function getCookie(key: string) {
  var b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)')
  return b ? b.pop() : ''
}

export function removeCookie(key: string) {
  return (document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`)
}
