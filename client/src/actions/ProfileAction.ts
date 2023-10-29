import { ActionFunction } from 'react-router-dom'
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
    const id = form.get('id')
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
  } catch (error) {
    return { ok: false, message: (error as Error).message }
  }
}
