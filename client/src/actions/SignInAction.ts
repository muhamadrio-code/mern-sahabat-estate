import { ActionFunction, redirect } from "react-router-dom";
import { AuthRequestBody } from "../utils/utils";
import { store } from "../redux/store";
import { setCurrentUser } from "../redux/user/userSlice";
import { User } from "../models/User";

type SignInResponse = {
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

export const signInAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const body: AuthRequestBody = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const result: SignInResponse = await response.json()

    if(result.success) {
      store.dispatch(setCurrentUser(result.data.user))
      return redirect('/')
    } 
    
    return new Error(result.message)
  } catch (error) {
    return error
  }
}