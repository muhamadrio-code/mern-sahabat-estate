import { FC } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../utils/utils'
import { Link, LinkProps } from 'react-router-dom'


const navLinkVariants = cva(
  "inline-flex items-center border-box justify-center p-2 hover:underline text-slate-700 font-semibold",
  {
    variants: {
      size: {
        default: 'text-base',
        sm: 'text-sm',
      },
      weight: {
        semiBold: "font-semibold",
        bold: "font-bold"
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)
 
interface MyLinkProps extends LinkProps, VariantProps<typeof navLinkVariants> {}

const MyLink : FC<MyLinkProps> = ({ className, size, ...props }) => {
  return <Link className={cn(navLinkVariants({ className, size }))} {...props}/> 
}
 
export { MyLink, navLinkVariants };
