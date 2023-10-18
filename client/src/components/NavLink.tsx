import { forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../utils/utils'
import { Link, LinkProps,  } from 'react-router-dom'


const navLinkVariants = cva(
  "inline-flex items-center justify-center m-2 hover:underline text-slate-700",
  {
    variants: {
      size: {
        default: 'h-10',
        sm: 'h-9 text-[14px]',
        lg: 'h-12 text-lg'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)
 
interface NavLinkProps extends LinkProps, VariantProps<typeof navLinkVariants> {}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ className, size, ...props }) => {
  return <Link className={cn(navLinkVariants({ className, size }))} {...props}/> 
})
 
export { NavLink, navLinkVariants };
