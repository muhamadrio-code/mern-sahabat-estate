import { ActionFunction, redirect } from 'react-router-dom'
import { User } from '../models/User'
import { store } from '../redux/store'
import { updateUserAvatar, setCurrentUser } from '../redux/user/userSlice'


type Result = {
  success: boolean
} & (SuccessResponse | FailedResponse)

type SuccessResponse = {
  success: true
  data: { user: User }
}
type FailedResponse = {
  success: false
  message: string
}

export const profileAction: ActionFunction = async ({ request }) => {
  try {
    const form = await request.formData()
    const userId = form.get('id')?.toString() as string

    switch (request.method) {
      case "POST": {
        return updateUser(userId, form);
      }
      case "DELETE": {
        return deleteUser(userId);
      }
      default: {
        return { ok: false }
      }
    }
    
  } catch (error) {
    return { ok: false, message: (error as Error).message }
  }
}

async function updateUser(id: string, form: FormData) {
  const avatar = form.get('avatar')
  const obj = Object.fromEntries(form)
  if(Object.keys(obj).length <= 1) return { ok: false }

  const body = JSON.stringify(obj)
  const res = await fetch(`/api/user/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
  const result: Result = await res.json()

  if (!result.success) return { ok: false, message: result.message }
  avatar && store.dispatch(updateUserAvatar(avatar.toString()))
  store.dispatch(setCurrentUser(result.data.user))
  
  return { ok: true }
}

async function deleteUser(id: string) {
  const res = await fetch(`/api/user/${id}`, {
    method: 'DELETE',
  })
  const result: Result = await res.json()

  if (!result.success) return { ok: false, message: result.message }
  store.dispatch(setCurrentUser(null))
  
  return redirect('/signin')
}
