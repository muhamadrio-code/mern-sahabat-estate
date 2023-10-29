import { FC, useRef, ChangeEvent, ComponentProps } from 'react'
import { useStorageService } from '../hooks/useStorageService'
import { useSubmit } from 'react-router-dom'

type ProfilePhotoProps = ComponentProps<'img'> & { userId: string | undefined }

export const ProfilePhoto: FC<ProfilePhotoProps> = ({ src, userId }) => {
  const { state: storageState, dispatch: fileDispatch } = useStorageService()
  const submit = useSubmit()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const selectImgFile = () => fileInputRef?.current?.click()
  const handleInputFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)
    file && fileDispatch(file, (url) => {
      userId && submit({ id: userId, avatar: url }, { method: 'POST' })
    })
  }
  const progress = storageState.state === 'onProgress' && storageState.progress
  const errorMessage = storageState.state === 'error' && storageState.errorMessage

  return (
    <>
      <input ref={fileInputRef} onChange={handleInputFileOnChange} type="file" accept="image/*" hidden />
      <img src={src} onClick={selectImgFile} alt="profile_photo.jpg" className="w-20 h-20 rounded-full cursor-pointer object-cover" />
      <h4 className='w-full text-center' hidden={!progress && !errorMessage}>{(progress && "Uploading: " + progress + '%') || errorMessage}</h4>
    </>
  )
}
