import { SearchBar, MyLink, CompanyLogo } from './'

export default function NavBar() {
  console.log("render navbar");

  return (
    <header className='flex shadow-md p-3 bg-slate-200 justify-center items-center'>
      <div className='flex w-full max-w-6xl justify-between items-center px-3'>
        <CompanyLogo />
        <SearchBar
          placeholder='Search..'
          className='mx-auto'
        />

        <nav className='flex'>
          <MyLink to='/' className='hidden md:block'>Home</MyLink>
          <MyLink to='/about' className='hidden md:block'>About</MyLink>
          <MyLink to='/signin'
            className='px-4 ml-2 bg-primary rounded-lg text-white hover:no-underline hover:bg-primary-50'>Sign In</MyLink>
        </nav>
      </div>
    </header>
  )
}
