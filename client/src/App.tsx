import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
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
import { PrivateLayout } from './pages/PrivateLayout'

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
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
)

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}