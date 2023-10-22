import { Form, useActionData } from "react-router-dom";
import { MyLink, LoadingButton } from "../components";


export default function SignUp() {
  const error: Error | undefined = useActionData() as Error
  const inputClassStyle = "p-3 rounded-lg w-full"
  return (
    <Form method="post" className="sm:w-[32rem] mt-4 p-4 m-auto flex-col min-h-min flex justify-center items-center gap-6" replace>
      <div className="w-full m-auto flex-col min-h-min flex justify-center items-center gap-5">
        <h1 className="text-2xl font-bold p-4">Sign Up</h1>
        <input id='username' type="text" name="username" placeholder="username" className={inputClassStyle} required />
        <input id='email' type="email" name="email" placeholder="email" className={inputClassStyle} required />
        <input id='password' type="password" name='password' placeholder="Password" className={inputClassStyle} required minLength={6} />
        <LoadingButton />
        <p className="text-red-700 tex-sm italic">{error && error?.message}</p>
        <h4 className="mr-auto">
          Have an account? <MyLink relative="path" to='../signin' className="text-secondary">Sign in</MyLink>
        </h4>
      </div>
    </Form>
  )
}