import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(time: number) {
  return new Promise((res) => {
    setTimeout(res, time);
  });
}

export function titleCase(...strings: string[]) {
  const str = strings.join(" ");
  return str.replace(/(^|\s)\S/g, (t) => t.toUpperCase());
}

export function currency(value: number) {
  return new Intl.NumberFormat("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function createURLParams(query: any) {
  if (!query) {
    return "";
  }
  const params = new URLSearchParams();
  Object.keys(query).forEach((key) => {
    if (query[key]) {
      params.append(key, query[key]);
    }
  });
  return params.toString();
}