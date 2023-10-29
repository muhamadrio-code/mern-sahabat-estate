import { StorageError, UploadTaskSnapshot, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseApp } from "../firebae";
import { useState } from "react";

type StorageState = {
  state: 'idle' | 'onProgress' | 'complete' | 'error'
} & ({
  state: 'idle'
} | {
  state: 'onProgress',
  progress: number
} | {
  state: 'complete',
  downloadURL: string
} | {
  state: 'error',
  errorMessage: string
})

export function useStorageService(): { state: StorageState, dispatch: (file: File, callback?: (a:string) => void) => void } {
  const [storageState, setStorageState] = useState<StorageState>({
    state: 'idle'
  })

  return {
    state: storageState,
    dispatch: function (file: File, callback?: (a:string) => void) {
      setStorageState({ state: 'idle' })
      const storage = getStorage(firebaseApp)
      const fileName = Date.now() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      const snapshot = (snapshot: UploadTaskSnapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / file.size) * 100)
        setStorageState({ state: 'onProgress', progress })
      }
      const onError = () => {
        setStorageState({ state: 'error', errorMessage: "Failed uploading image" })
      }
      const onComplete = async () => {
        const downloadURL = await getDownloadURL(storageRef)
        setStorageState({ state: 'complete', downloadURL })
        callback?.(downloadURL)
      }
      uploadTask.on("state_changed", snapshot, onError, onComplete)
    }
  }
}
