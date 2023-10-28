import { Form } from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"
import { cn } from "../utils/utils"
import { buttonVariants } from "../components/LoadingButton"
import { useRef, ChangeEvent } from "react"
import { useStorageService } from "../hooks/useStorageService"

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { currentUser } = useAppSelector(state => state.user)
  const { state: storageState, dispatch } = useStorageService()

  const avatar = storageState.state === 'complete' && storageState.downloadURL || currentUser?.avatar
  const progress = storageState.state === 'onProgress' && storageState.progress
  const errorMessage = storageState.state === 'error' && storageState.errorMessage

  const selectImgFile = () => fileInputRef?.current?.click()
  const handleInputFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    file && dispatch(file)
  }

  const inputClassStyle = "p-3 rounded-lg w-full disabled:bg-primary-variant"
  return (
    <section className="w-full">
      <div className="flex flex-col p-2 max-w-lg items-center relative inset-y-10 justify-center m-auto ">
        <h1 className="text-2xl font-bold p-4">Profile</h1>
        <input ref={fileInputRef} onChange={handleInputFileOnChange} type="file" accept="image/*" hidden/>
        <img src={avatar} onClick={selectImgFile} alt="profile_photo.jpg" className="w-20 h-20 rounded-full cursor-pointer object-cover"/>
        <h4 hidden={!progress && !errorMessage}>{(progress && "Uploading: " + progress + '%') || errorMessage}</h4>
        <Form method="post" className="sm:w-full mt-8 flex-col min-h-min flex justify-center items-center">
          <div className="w-full m-auto flex-col min-h-min flex justify-center items-center gap-3">
            <input id='username' type="text" name="username" defaultValue={currentUser?.username} className={inputClassStyle} required />
            <input id='email' type="email" name="email" defaultValue={currentUser?.email} className={inputClassStyle} required />
            <input id='password' type="password" name='password' placeholder="new password" className={inputClassStyle} required minLength={6} />
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
