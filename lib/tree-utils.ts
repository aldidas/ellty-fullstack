import { Prisma } from "@/generated/client";

/**
 * Represents a node in the tree, extending the Prisma Tree payload
 * with a `children` array for recursive structures.
 */
export type TreeNode = Prisma.TreeGetPayload<{
  include: {
    user: true;
  };
}> & {
  children: TreeNode[];
};

/**
 * Transforms a flat array of nodes into a hierarchical tree structure.
 * Nodes are linked based on their `parentId`.
 * @param nodes - A flat array of Prisma `Tree` objects.
 * @returns An array of `TreeNode` objects representing the root nodes of the tree.
 */
export function generateTree(
  nodes: Prisma.TreeGetPayload<{
    include: {
      user: true;
    };
  }>[],
): TreeNode[] {
  const nodeMap = new Map<string, TreeNode>();
  const treeData: TreeNode[] = [];

  // First pass: create a map of nodes and initialize children arrays.
  nodes.forEach((node) => {
    nodeMap.set(node.id, { ...node, children: [] });
  });

  // Second pass: link children to their parents.
  nodes.forEach((node) => {
    const treeNode = nodeMap.get(node.id);
    if (treeNode) {
      if (node.parentId) {
        const parentNode = nodeMap.get(node.parentId);
        if (parentNode) {
          parentNode.children.push(treeNode);
        }
      } else {
        // Nodes without a parentId are root nodes.
        treeData.push(treeNode);
      }
    }
  });

  return treeData;
}

/**
 * Calculates a new numerical value based on a parent's value and an operation.
 * If no operation or parent value is provided, it returns the initial value.
 * @param value - The new value to be used in the operation.
 * @param operation - The arithmetic operation to perform.
 * @param parentValue - The value of the parent node to operate on.
 * @returns The result of the calculation, or the original value if context is missing. Returns null if the initial value is invalid.
 */
export function getNewValue(
  value: number,
  operation?: "plus" | "minus" | "times" | "divide" | null,
  parentValue?: number,
): number | null {
  if (value === null || value === undefined) return null;
  if (!operation || parentValue === undefined) return value;

  let result: number;
  switch (operation) {
    case "plus":
      result = parentValue + value;
      break;
    case "minus":
      result = parentValue - value;
      break;
    case "times":
      result = parentValue * value;
      break;
    case "divide":
      // Handle division by zero, though the caller should also validate.
      result = value === 0 ? Infinity : parentValue / value;
      break;
    default:
      result = value;
      break;
  }
  return result;
}

/**
 * Maps an operation string to its corresponding mathematical symbol.
 * @param operation - The name of the operation (e.g., "plus").
 * @returns The symbol as a string (e.g., "⊕"), or an empty string if not found.
 */
export function mapSymbol(operation: string): string {
  switch (operation) {
    case "plus":
      return "⊕";
    case "minus":
      return "⊖";
    case "times":
      return "⊗";
    case "divide":
      return "⨸";
    default:
      return "";
  }
}