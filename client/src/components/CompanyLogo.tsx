import { Link } from "react-router-dom"

export function CompanyLogo() {
  return (
    <Link className="cursor-pointer" to='/'>
      <h1 className='text-xl font-bold text-slate-500 text-center'>
        Sahabat
        <span className='text-slate-700'>Estate</span>
      </h1>
    </Link>
  )
}
