import { FaSearch } from 'react-icons/fa'
import { cn } from '../utils/utils'
import { Form, FormProps, useLocation } from "react-router-dom";
import { FC } from 'react'
import { VariantProps, cva } from 'class-variance-authority';

export const searchBarVariants = cva("inline-flex pl-4 w-[30%] border border-color bg-slate-100 rounded-lg justify-between items-center gap-2 overflow-hidden")

interface SearchBarComponentProps extends FormProps, VariantProps<typeof searchBarVariants> {
}

export const SearchBar: FC<SearchBarComponentProps> = ({ className, placeholder, ...props }) => {
 
  return (
    <Form method="get" action='/search' className={cn(searchBarVariants({ className }))} {...props}>
      <input name="q" className='focus:outline-none bg-transparent text-sm w-full' 
        placeholder={placeholder} autoComplete="off" />
      <button type="submit"
        className='cursor-pointer ml-auto h-11 w-12 text-center text-slate-600 flex justify-center items-center hover:text-slate-400'>
        <FaSearch />
      </button>
    </Form>
  )
}