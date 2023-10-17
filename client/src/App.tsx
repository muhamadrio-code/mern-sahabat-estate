import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  Home,
  SignIn,
  SignUp,
  About,
  Profile,
} from './pages'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-out' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

