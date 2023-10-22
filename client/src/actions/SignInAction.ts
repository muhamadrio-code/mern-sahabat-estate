import { ActionFunction, redirect } from "react-router-dom";
import { RequestBody, ResponseBody } from "../utils/utils";

export const signInAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const body: RequestBody = {
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
    const data: ResponseBody = await response.json()
    if(data.success) {
      return redirect('/')
    } else {
      return new Error(data.message)
    }
  } catch (error) {
    return error
  }
}