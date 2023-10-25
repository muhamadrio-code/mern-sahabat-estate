import { ActionFunction } from "react-router-dom";
import { AuthRequestBody } from "../utils/utils";

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
    return await response.json()
  } catch (e) {
    return { status: false, message: "Something went wrong" }
  }
}