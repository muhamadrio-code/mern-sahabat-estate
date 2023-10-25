import { useCallback } from 'react'
import { firebaseApp } from '../firebae'
import { cn } from '../utils/utils'
import { buttonVariants } from './LoadingButton'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useAppDispatch } from '../hooks/hooks'
import { setCurrentUser } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'


export const OAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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
        const responseJson = await res.json()
        dispatch(setCurrentUser(responseJson.data.user))
        navigate('/')
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
