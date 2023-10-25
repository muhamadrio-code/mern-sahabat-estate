import { Form, useActionData } from "react-router-dom";
import { MyLink, LoadingButton, OAuth } from "../components";

export default function SignIn() {
  const error = useActionData() as Error

  const inputClassStyle = "p-3 rounded-lg w-full"
  return (
    <Form method="post" className="sm:w-[32rem] mt-4 p-4 m-auto flex-col min-h-min flex justify-center items-center gap-6" replace>
      <div className="w-full m-auto flex-col min-h-min flex justify-center items-center gap-5">
        <h1 className="text-2xl font-bold p-4">Sign In</h1>
        <input id='email' type="email" name="email" placeholder="email" className={inputClassStyle} required />
        <input id='password' type="password" name="password" placeholder="Password" className={inputClassStyle} required minLength={6} />
        <LoadingButton>Sign In</LoadingButton>
        <OAuth />
        {error && <p className="text-red-500 tex-sm italic mr-auto">{error.message}</p>}
        <h4 className="mr-auto">
          Don't have an account? <MyLink relative="path" to='../signup' className="text-secondary">Sign up</MyLink>
        </h4>
      </div>
    </Form>
  )
}