import { redirect } from 'react-router-dom'
import { store } from '../redux/store'
import { setCurrentUser } from '../redux/user/userSlice'

export default async function signOutAction() {
  const res = await fetch(`/api/auth/signout`)
  const result = await res.json()

  if (!result.success) return { ok: false, message: result.message }
  store.dispatch(setCurrentUser(null))

  return redirect('/signin')
}