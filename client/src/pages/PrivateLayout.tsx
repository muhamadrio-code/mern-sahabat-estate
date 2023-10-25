import { useAppSelector } from "../hooks/hooks"
import { Navigate, Outlet } from "react-router-dom"
export const PrivateLayout = () => {
  const { currentUser } = useAppSelector(state => state.user)
  return currentUser ? <Outlet /> : <Navigate to='/signin'/>
}
