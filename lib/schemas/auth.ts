import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email('Email is required / Format is invalid'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Email is required / Format is invalid'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
