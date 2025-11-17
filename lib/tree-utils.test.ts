import { describe, it, expect } from 'vitest';
import { generateTree, getNewValue, mapSymbol } from './tree-utils';
import { Prisma } from '@/generated/client';

// Mock data that matches the Prisma payload shape
const mockUser = {
  id: 'user1',
  name: 'Test User',
  email: 'test@example.com',
  emailVerified: true,
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const createMockNode = (
  id: string,
  parentId: string | null,
  number: number,
): Prisma.TreeGetPayload<{ include: { user: true } }> => ({
  id,
  parentId,
  number,
  operation: 'plus',
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: 'user1',
  user: mockUser,
  leftNumber: 1,
});

describe('generateTree', () => {
  it('should build a correct tree from a flat list', () => {
    const nodes = [
      createMockNode('1', null, 10),
      createMockNode('2', '1', 20),
      createMockNode('3', '1', 30),
      createMockNode('4', '2', 40),
      createMockNode('5', null, 50),
    ];

    const tree = generateTree(nodes);

    expect(tree).toHaveLength(2); // Two root nodes
    expect(tree[0].id).toBe('1');
    expect(tree[0].children).toHaveLength(2);
    expect(tree[0].children[0].id).toBe('2');
    expect(tree[0].children[0].children).toHaveLength(1);
    expect(tree[0].children[0].children[0].id).toBe('4');
    expect(tree[1].id).toBe('5');
    expect(tree[1].children).toHaveLength(0);
  });

  it('should return an empty array for empty input', () => {
    expect(generateTree([])).toEqual([]);
  });

  it('should handle nodes with no parent that exists in the list', () => {
    const nodes = [
      createMockNode('1', null, 10),
      createMockNode('2', '99', 20), // Parent '99' does not exist
    ];
    const tree = generateTree(nodes);
    expect(tree).toHaveLength(1);
    expect(tree[0].id).toBe('1');
    expect(tree[0].children).toHaveLength(0);
  });
});

describe('getNewValue', () => {
  it('should return the value if no operation or parentValue is provided', () => {
    expect(getNewValue(10)).toBe(10);
    expect(getNewValue(10, 'plus')).toBe(10);
    expect(getNewValue(10, null, 5)).toBe(10);
  });

  it('should perform addition', () => {
    expect(getNewValue(10, 'plus', 5)).toBe(15);
  });

  it('should perform subtraction', () => {
    expect(getNewValue(5, 'minus', 10)).toBe(5);
  });

  it('should perform multiplication', () => {
    expect(getNewValue(10, 'times', 5)).toBe(50);
  });

  it('should perform division', () => {
    expect(getNewValue(5, 'divide', 10)).toBe(2);
  });

  it('should handle division by zero', () => {
    expect(getNewValue(0, 'divide', 10)).toBe(Infinity);
  });

  it('should return null if value is null or undefined', () => {
    // @ts-expect-error
    expect(getNewValue(null)).toBe(null);
    // @ts-expect-error
    expect(getNewValue(undefined)).toBe(null);
  });
});

describe('mapSymbol', () => {
  it('should map operation names to symbols', () => {
    expect(mapSymbol('plus')).toBe('⊕');
    expect(mapSymbol('minus')).toBe('⊖');
    expect(mapSymbol('times')).toBe('⊗');
    expect(mapSymbol('divide')).toBe('⨸');
  });

  it('should return empty string for unknown operation', () => {
    expect(mapSymbol('unknown')).toBe('');
    expect(mapSymbol('')).toBe('');
  });
});
