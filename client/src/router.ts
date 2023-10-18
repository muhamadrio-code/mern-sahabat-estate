import { createBrowserRouter } from 'react-router-dom'
import {
  Home,
  SignIn,
  SignUp,
  About,
  Profile,
} from './pages'

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/sign-in", Component: SignIn },
  { path: "/sign-up", Component: SignUp },
  { path: "/profile", Component: Profile },
  { path: "/about", Component: About },
]) 