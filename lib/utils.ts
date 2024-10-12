import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args));
}


// export function cx(...classes: (string | undefined | null)[]) {
//     return classes.filter(Boolean).join(' ');
//   }


// utils.ts