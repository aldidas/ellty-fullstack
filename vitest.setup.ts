import { vi } from 'vitest';

vi.mock('@/lib/db', () => ({
  default: {
    tree: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    // Mock other models and functions as needed
  },
}));
