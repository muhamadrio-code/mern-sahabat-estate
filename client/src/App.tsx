import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, redirect } from 'react-router-dom'
import { Root } from './components'
import {
  Home,
  SignIn,
  SignUp,
  About,
  Profile,
  Search,
} from './pages'
import { signUpAction } from './actions/SignUpAction'
import { signInAction } from './actions/SignInAction'
import { profileAction } from './actions/ProfileAction'
import { PrivateLayout } from './pages/PrivateLayout'
import signOutAction from './actions/SignOutAction'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="signin" element={<SignIn />} action={signInAction} />
      <Route path="signup" element={<SignUp />}
        action={signUpAction}
      />
      <Route path="about" element={<About />} />
      <Route element={<PrivateLayout />} >
        <Route path="search" element={<Search />} />
        <Route path="profile" element={<Profile />} action={profileAction} />
      </Route>
      <Route path="signout" action={signOutAction} loader={() => redirect('/')}/>
    </Route>
  )
)

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}