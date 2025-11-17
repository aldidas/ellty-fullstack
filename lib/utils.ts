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

/**
 * Combines multiple class names into a single string, resolving conflicts.
 * Uses clsx for conditional classes and tailwind-merge for resolving Tailwind CSS conflicts.
 * @param inputs - A list of class names or conditional class objects.
 * @returns A single string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Transforms an error object into a `FormState` object for server actions.
 * Handles ZodErrors, standard Errors, and other unknown error types.
 * @param error - The error caught, can be of any type.
 * @param formData - The FormData from the form submission.
 * @returns A `FormState` object with an "ERROR" status and extracted error messages.
 */
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

/**
 * Generates initials from a full name.
 * @param fullName - The full name string (e.g., "John Doe").
 * @returns The initials in uppercase (e.g., "JD"). Returns an empty string if fullName is empty.
 */
export function getInitial(fullName: string): string {
  if (!fullName) return "";
  const [firstName, ...restOfTheName] = fullName.trim().split(" ");
  let initial = firstName.charAt(0);
  const validRestOfTheName = restOfTheName.filter(word => !!word);
  if (validRestOfTheName.length > 0) {
    const restName = validRestOfTheName.join(" ");
    initial = `${initial}${restName.charAt(0)}`;
  }
  return initial.toUpperCase();
}
