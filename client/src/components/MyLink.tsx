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
        lg: 'text-lg',
        xl: 'text-xl',
      },
      weight: {
        semiBold: "font-semibold",
        bold: "font-bold",
        extraBold: "font-extrabold"
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)
 
interface MyLinkProps extends LinkProps, VariantProps<typeof navLinkVariants> {}

const MyLink : FC<MyLinkProps> = ({ className, weight, size, ...props }) => {
  return <Link className={cn(navLinkVariants({ className, size, weight }))} {...props}/> 
}
 
export { MyLink, navLinkVariants };
