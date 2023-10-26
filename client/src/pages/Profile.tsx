import { Form } from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"
import { cn } from "../utils/utils"
import { buttonVariants } from "../components/LoadingButton"
import { useRef } from "react"

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { currentUser } = useAppSelector(state => state.user)
  const inputClassStyle = "p-3 rounded-lg w-full disabled:bg-primary-variant"
  const selectImgFile = () => {
    fileInputRef?.current?.click()
  }
  return (
    <section className="w-full">
      <div className="flex flex-col p-2 max-w-lg items-center relative inset-y-10 justify-center m-auto ">
        <h1 className="text-2xl font-bold p-4">Profile</h1>
        <input ref={fileInputRef} type="file" accept="image/*" hidden/>
        <img src={currentUser?.avatar} onClick={selectImgFile} alt="profile_photo.jpg" className="w-20 h-20 rounded-full cursor-pointer object-cover"/>
        <Form method="post" className="sm:w-full mt-8 flex-col min-h-min flex justify-center items-center">
          <div className="w-full m-auto flex-col min-h-min flex justify-center items-center gap-3">
            <input disabled id='username' type="text" name="username" defaultValue={currentUser?.username} className={inputClassStyle} required />
            <input disabled id='email' type="email" name="email" defaultValue={currentUser?.email} className={inputClassStyle} required />
            <input disabled id='password' type="password" name='password' placeholder="new password" className={inputClassStyle} required minLength={6} />
            <button type='button' className={cn("bg-primary cursor-pointer disabled:cursor-default hover:opacity-90 disabled:opacity-90" ,buttonVariants())}>Update</button>
          </div>
        </Form>
        <div className="text-red-500 text-md flex justify-between items-center cursor-pointer w-full mt-3">
        <h5>Delete account</h5>
        <h5>Logout</h5>
        </div>
      </div>
    </section>
  )
}
