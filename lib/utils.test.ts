import { describe, it, expect } from 'vitest';
import { ZodError } from 'zod';
import { cn, fromErrorToFormState, getInitial } from './utils';

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('should handle conditional classes', () => {
    expect(cn('base', { conditional: true })).toBe('base conditional');
    expect(cn('base', { conditional: false })).toBe('base');
  });

  it('should resolve tailwind conflicts, with the last one winning', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });
});

describe('fromErrorToFormState', () => {
  const formData = new FormData();
  formData.append('field', 'value');

  it('should handle ZodError', () => {
    const zodError = new ZodError([
      {
        path: ['name'],
        message: 'Name is required',
        code: 'custom',
      },
    ]);
    const formState = fromErrorToFormState(zodError, formData);
    expect(formState.status).toBe('ERROR');
    expect(formState.errors.name).toEqual(['Name is required']);
    expect(formState.formData).toBe(formData);
  });

  it('should handle standard Error', () => {
    const error = new Error('Something went wrong');
    const formState = fromErrorToFormState(error, formData);
    expect(formState.status).toBe('ERROR');
    expect(formState.message).toBe('Something went wrong');
    expect(formState.errors).toEqual({});
  });

  it('should handle unknown errors', () => {
    const error = { message: 'Unknown error' };
    const formState = fromErrorToFormState(error, formData);
    expect(formState.status).toBe('ERROR');
    expect(formState.message).toBe('Unknown error');
  });

  it('should handle truly unknown errors with no message', () => {
    const error = {};
    const formState = fromErrorToFormState(error, formData);
    expect(formState.status).toBe('ERROR');
    expect(formState.message).toBe('An unknown error occured.');
  });
});

describe('getInitial', () => {
  it('should return empty string for empty input', () => {
    expect(getInitial('')).toBe('');
  });

  it('should return the first letter for a single name', () => {
    expect(getInitial('John')).toBe('J');
  });

  it('should return initials for two names', () => {
    expect(getInitial('John Doe')).toBe('JD');
  });

  it('should return initials for multiple names', () => {
    expect(getInitial('John Fitzgerald Kennedy')).toBe('JF');
  });

  it('should handle extra spaces', () => {
    expect(getInitial('  John  Doe  ')).toBe('JD');
  });
});
