export function setJwtToken(token: string, expires?: Date) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  if (expires) {
    document.cookie = `jwt=${token}; Expires=${expires}; Path=/; SameSite=Strict${secure}`
  }
  document.cookie = `jwt=${token}; Path=/; SameSite=Strict${secure}`
}
