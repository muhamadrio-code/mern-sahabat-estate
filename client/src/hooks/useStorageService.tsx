import { StorageError, UploadTaskSnapshot, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseApp } from "../firebae";
import { useState, useCallback } from "react";

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

export function useStorageService(): { state: StorageState, dispatch: (file: File) => void } {
  const [storageState, setStorageState] = useState<StorageState>({
    state: 'idle'
  })

  const setFile = useCallback(
    (file: File) => {
      setStorageState({state: 'idle'})
      const storage = getStorage(firebaseApp)
      const fileName = Date.now() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      const snapshot = (snapshot: UploadTaskSnapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / file.size) * 100)
        setStorageState({ state: 'onProgress', progress })
      }
      const onError = (error: StorageError) => {
        setStorageState({ state: 'error', errorMessage: error.message })
      }
      const onComplete = async () => {
        const downloadURL = await getDownloadURL(storageRef)
        setStorageState({ state: 'complete', downloadURL })
      }
      uploadTask.on("state_changed", snapshot, onError, onComplete)
    },
    [],
  )

  return { state: storageState, dispatch: setFile }
}
