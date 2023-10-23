import { useCallback } from 'react'
import { firebaseApp } from '../firebae'
import { cn } from '../utils/utils'
import { buttonVariants } from './LoadingButton'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'



export const OAuth = () => {
  
  const handleGoogleSignIn = useCallback(
    async () => {
      try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(firebaseApp)
        const result = await signInWithPopup(auth, provider)
        const { displayName, email, photoURL } = result.user
        const res = await fetch('api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: displayName, email, photo: photoURL })
        })
        const data = await res.json() 
        console.log(data);
      } catch (error) {
        console.error("Could not sign in with google", error);
      }
    },
    [],
  )
  
  return (
    <button 
    type='button'
    onClick={handleGoogleSignIn}
    className={cn('bg-red-700 hover:bg-red-600', buttonVariants())}>
      Continue With Google
    </button>
  )
}
