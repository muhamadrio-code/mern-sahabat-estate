import { useAppDispatch } from "../hooks/hooks"
import { setCurrentUser } from "../redux/user/userSlice"

export default function Profile() {
  const dispatch = useAppDispatch()
  return (
    <button onClick={() => dispatch(setCurrentUser(null))}>Profile</button>
  )
}
