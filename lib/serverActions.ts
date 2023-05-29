'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getJwtToken() {
  const cookieStore = cookies()
  const token = cookieStore.get('jwt')
  return token
}

export async function clearJwtToken() {
  const cookieStore = cookies()
  cookieStore.set('jwt', '')
}

export async function serverRedirect(path: string) {
  redirect(path)
}

export async function serverRevalidatePath(path: string) {
  revalidatePath(path)
}
