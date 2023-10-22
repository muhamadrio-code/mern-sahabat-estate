import { FC, ComponentProps } from "react";
import { useNavigation } from "react-router-dom";
const Spinner = () => {
  return <div
    className="m-12 inline-block h-5 w-5 animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-3 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
  </div>
}

export const LoadingButton: FC<ComponentProps<'button'>> = ({ children }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting"
  const buttonColor = isSubmitting ? "bg-primary-50" : "bg-primary"
  const cursor = isSubmitting ? "cursor-wait" : "cursor-pointer"

  return (
    <button disabled={isSubmitting} type="submit"
      className={`${buttonColor} ${cursor} hover:bg-primary-50 flex justify-center items-center w-full h-12 py-3 rounded-lg text-white font-semibold`}>
      {isSubmitting ? <Spinner /> : children}
    </button>
  )
}