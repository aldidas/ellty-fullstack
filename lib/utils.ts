import { clsx, type ClassValue } from "clsx";
import { ZodError } from "zod";
import { twMerge } from "tailwind-merge";

export interface FormState {
  formData: FormData | null;
  message: string;
  status: "SUCCESS" | "ERROR" | "UNSET";
  errors: Record<string, string[] | undefined>;
  timestamp: number;
}

export const initialState: FormState = {
  formData: null,
  status: "UNSET",
  message: "",
  errors: {},
  timestamp: Date.now(),
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fromErrorToFormState(
  error: unknown,
  formData: FormData,
): FormState {
  if (error instanceof ZodError) {
    return {
      formData: formData ?? null,
      message: "",
      status: "ERROR",
      errors: error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      formData: formData ?? null,
      message: error.message,
      status: "ERROR",
      errors: {},
      timestamp: Date.now(),
    };
  } else {
    const errorData = error as Record<string, string>;
    return {
      formData: formData ?? null,
      message: errorData?.message || "An unknown error occured.",
      status: "ERROR",
      errors: {},
      timestamp: Date.now(),
    };
  }
}

export function getInitial(fullName: string): string {
  if (!fullName) return "";
  const [firstName, ...restOfTheName] = fullName.split(" ");
  let initial = firstName.charAt(0);
  if (restOfTheName.length > 0) {
    const restName = restOfTheName.join(" ");
    initial = `${initial}${restName.charAt(0)}`;
  }
  return initial.toUpperCase();
}
