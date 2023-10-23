import { Form, Navigate, useActionData } from "react-router-dom";
import { MyLink, LoadingButton, OAuth } from "../components";
import { setCurrentUser } from "../redux/user/userSlice";
import { User } from "../models/User";
import { useAppDispatch } from "../hooks/hooks";

type BaseResponse = {
  success: boolean
}
type SuccessResponse = BaseResponse & {
  data: User
}
type FailedResponse = BaseResponse & {
  message: string
}

const useSignIn = () => {
  const actionData = useActionData()
  const dispatch = useAppDispatch()

  if ((actionData as SuccessResponse)?.data) {
    const data = actionData as SuccessResponse
    dispatch(setCurrentUser(data.data as User))
  }

  return actionData as BaseResponse
}

export default function SignIn() {
  const data = useSignIn() as BaseResponse
  const isLoginSuccess = (data as SuccessResponse)?.success
  const errorMessage = (data as FailedResponse)?.message
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