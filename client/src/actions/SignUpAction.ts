import { ActionFunction, redirect } from "react-router-dom";

type RequestBody = {
  username: FormDataEntryValue | null,
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
}

export type ResponseBody = {
  success: boolean,
  message: string
}

export const signUpAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const body: RequestBody = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  }
  
  try {
    const response = await fetch('/api/auth/signup', {
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