import { Form, useActionData, useSubmit } from "react-router-dom"
import { useState, FormEvent, ChangeEvent } from 'react'
import { useAppSelector } from "../hooks/hooks"
import { cn } from "../utils/utils"
import { LoadingButton, buttonVariants } from "../components/LoadingButton"
import { ProfilePhoto } from "../components/ProfilePhoto"

type ProfileFormData = {
  id: string
  username?: string
  email?: string
  password?: string
}

export default function Profile() {
  const [isOnEdit, setIsOnEdit] = useState(false)
  const submit = useSubmit()
  const error = useActionData() as { ok: boolean, message: string }
  const { currentUser } = useAppSelector(state => state.user)
  const [formData, setFormData] = useState<ProfileFormData>({ id: currentUser?._id } as ProfileFormData)
  const inputClassStyle = "p-3 rounded-lg w-full disabled:bg-primary-variant"

  function handleOnchange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    submit(formData, { method: 'POST' })
    setIsOnEdit(false)
  }

  function handleDeleteAccount() {
    submit({ id: currentUser && currentUser._id }, { method: 'DELETE' })
  }
  
  function handleSignOut() {
    submit(null, { method: 'POST', action: '/signout' })
  }

  return (
    <section className="w-full">
      <div className="flex flex-col p-2 max-w-lg items-center relative inset-y-10 justify-center m-auto ">
        <ProfilePhoto src={currentUser?.avatar} userId={currentUser?._id} />
        <Form onSubmit={onSubmit} className="w-full mt-8 flex-col min-h-min flex justify-center items-center">
          <div className="w-full m-auto flex-col min-h-min flex justify-center items-center gap-3">
            <input onChange={handleOnchange} disabled={!isOnEdit} id='username' type="text" defaultValue={currentUser?.username} className={inputClassStyle} />
            <input onChange={handleOnchange} disabled={!isOnEdit} id='email' type="email" defaultValue={currentUser?.email} className={inputClassStyle} />
            <input onChange={handleOnchange} disabled={!isOnEdit} id='password' type="password" placeholder="new password" className={inputClassStyle} minLength={6} />
            {isOnEdit ? <LoadingButton>save</LoadingButton> : <button type='button' onClick={() => setIsOnEdit(true)} className={cn("bg-primary cursor-pointer disabled:cursor-default hover:opacity-90 disabled:opacity-90", buttonVariants())}>edit</button>}
          </div>
        </Form>
        <div className="text-red-500 text-md flex justify-between items-center cursor-pointer w-full mt-3">
          <h5 onClick={handleDeleteAccount}>Delete account</h5>
          <h5 onClick={handleSignOut}>Logout</h5>
        </div>
        {error?.ok ? <h4 className="text-sm mt-4 text-start w-full text-green-700">User updated successfully</h4> : <h4 className="text-sm mt-4 text-start w-full text-red-700">{error?.message}</h4>}
      </div>
    </section>
  )
}
