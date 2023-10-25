import { Form, Navigate, useActionData } from "react-router-dom";
import { MyLink, LoadingButton, OAuth } from "../components";
import { setCurrentUser } from "../redux/user/userSlice";
import { User } from "../models/User";
import { useAppDispatch } from "../hooks/hooks";

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

const useSignIn = () => {
  const actionData = useActionData() as SignInResponse
  const dispatch = useAppDispatch()

  if (actionData?.success) {
    dispatch(setCurrentUser(actionData.data.user))
  }

  return actionData
}

export default function SignIn() {
  const data = useSignIn() as SignInResponse
  const isLoginSuccess = data?.success
  const errorMessage = !data?.success && data?.message

  const inputClassStyle = "p-3 rounded-lg w-full"

  return (
    <Form method="post" className="sm:w-[32rem] mt-4 p-4 m-auto flex-col min-h-min flex justify-center items-center gap-6" replace>
      <div className="w-full m-auto flex-col min-h-min flex justify-center items-center gap-5">
        <h1 className="text-2xl font-bold p-4">Sign In</h1>
        <input id='email' type="email" name="email" placeholder="email" className={inputClassStyle} required />
        <input id='password' type="password" name='password' placeholder="Password" className={inputClassStyle} required minLength={6} />
        <LoadingButton>Sign In</LoadingButton>
        <OAuth />
        {isLoginSuccess ? <Navigate to='/' /> : <p className="text-red-500 tex-sm italic mr-auto">{errorMessage}</p>}
        <h4 className="mr-auto">
          Don't have an account? <MyLink relative="path" to='../signup' className="text-secondary">Sign up</MyLink>
        </h4>
      </div>
    </Form>
  )
}