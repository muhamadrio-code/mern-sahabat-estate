import { Form, useActionData, useNavigation } from "react-router-dom";
import { MyLink } from "../components";

const Spinner = () => {
  return <div
    className="m-12 inline-block h-5 w-5 animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-3 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
  </div>
}

const SignUpButton = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting"
  const buttonColor = isSubmitting ? "bg-primary-50" : "bg-primary"
  const cursor = isSubmitting ? "cursor-wait" : "cursor-pointer"

  return (
    <button disabled={isSubmitting} type="submit"
      className={`${buttonColor} ${cursor} hover:bg-primary-50 flex justify-center items-center w-full h-12 py-3 rounded-lg text-white font-semibold`}>
      {isSubmitting ? <Spinner /> : "Sign Up"}
    </button>
  )
}

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
        <SignUpButton />
        <p className="text-red-700 tex-sm italic">{error && error?.message}</p>
        <h4 className="mr-auto">
          Have an account? <MyLink relative="path" to='../signin' className="text-secondary">Sign in</MyLink>
        </h4>
      </div>
    </Form>
  )
}