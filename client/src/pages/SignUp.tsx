import { Form } from "react-router-dom";
import { MyLink } from "../components";

export default function SignUp() {
  const inputClassStyle = "p-3 rounded-lg w-full"
  return (
  <div className="sm:w-[32rem] mt-4 p-4 m-auto flex-col min-h-min flex justify-center items-center gap-6">
    <h1 className="text-2xl font-semibold p-4">Sign Up</h1>
    <Form className="w-full m-auto flex-col min-h-min flex justify-center items-center gap-5">
      <input id='username' type="text" name="username" placeholder="username" className={inputClassStyle} />
      <input id='email' type="email" name="email" placeholder="email" className={inputClassStyle} />
      <input id='password' type="password" placeholder="Password" className={inputClassStyle} />
      <button type="submit" className="bg-primary hover:bg-primary-50  w-full py-3 rounded-lg text-white font-semibold">Sign up</button>
    </Form>
    <h4 className="mr-auto">
      Have an account? <MyLink relative="path" to='../signin' className="text-secondary">Sign in</MyLink>
    </h4>
  </div>
  )
}
