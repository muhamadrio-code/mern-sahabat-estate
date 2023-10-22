import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export type RequestBody = {
  username?: FormDataEntryValue | null,
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
}

export type ResponseBody = {
  success: boolean,
  message: string
}