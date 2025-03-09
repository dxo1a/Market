export function setCookie(key: string, value: string, days: number = 7) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`
}
export function getCookie(key: string): string | null {
  const cookies = document.cookie.split('; ')
  for (const cookie of cookies) {
    const [cookieKey, cookieValue] = cookie.split('=')
    if (cookieKey === key) {
      return decodeURIComponent(cookieValue)
    }
  }
  return null
}
