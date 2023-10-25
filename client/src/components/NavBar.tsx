import { Link } from 'react-router-dom'
import { useAppSelector } from '../hooks/hooks'
import { SearchBar, MyLink, CompanyLogo } from './'

export default function NavBar() {
  const { currentUser } = useAppSelector(state => state.user)
  return (
    <header className='flex shadow-md p-3 bg-slate-200 justify-center items-center'>
      <div className='flex w-full max-w-6xl justify-between items-center px-3'>
        <CompanyLogo />
        <SearchBar
          placeholder='Search..'
          className='mx-auto'
        />

        <nav className='flex items-center gap-2'>
          <MyLink to='/' className='hidden md:block'>Home</MyLink>
          <MyLink to='/about' className='hidden md:block'>About</MyLink>
          <Link to='/profile' className='ml-2'>{
            currentUser ? <img src={currentUser.avatar} alt="profile_picture.jpg" className='w-10 h-10 border-2 border-slate-300 rounded-full'/> : <button className='w-full h-full px-4 py-2 font-semibold bg-primary rounded-lg text-white hover:no-underline hover:bg-primary-50'>Sign In</button>
          }</Link>
        </nav>
      </div>
    </header>
  )
}
