import { clsx, type ClassValue } from "clsx"
import { ZodError } from 'zod';
import { twMerge } from "tailwind-merge"


export interface FormState {
  message: string;
  status: 'SUCCESS' | 'ERROR' | 'UNSET';
  errors: Record<string, string[] | undefined>;
  timestamp: number;
}

export const initialState: FormState = {
  status: 'UNSET',
  message: '',
  errors: {},
  timestamp: Date.now()
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fromErrorToFormState(error: unknown): FormState {
  if (error instanceof ZodError) {
    return {
      message: '',
      status: 'ERROR',
      errors: error.flatten().fieldErrors,
      timestamp: Date.now()
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      status: 'ERROR',
      errors: {},
      timestamp: Date.now()
    };
  } else {
    const errorData = error as Record<string, string>;
    return {
      message: errorData?.message || 'An unknown error occured.',
      status: 'ERROR',
      errors: {},
      timestamp: Date.now()
    };
  }
}
