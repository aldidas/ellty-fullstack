import { Prisma } from "@/generated/client";

export type TreeNode = Prisma.TreeGetPayload<{
  include: {
    user: true;
  };
}> & {
  children: TreeNode[];
};

export function generateTree(
  nodes: Prisma.TreeGetPayload<{
    include: {
      user: true;
    };
  }>[],
): TreeNode[] {
  const nodeMap = new Map<string, TreeNode>();
  const treeData: TreeNode[] = [];

  nodes.forEach((node) => {
    nodeMap.set(node.id, { ...node, children: [] });
  });

  nodes.forEach((node) => {
    const treeNode = nodeMap.get(node.id);
    if (treeNode) {
      if (node.parentId) {
        const parentNode = nodeMap.get(node.parentId);
        if (parentNode) {
          parentNode.children.push(treeNode);
        }
      } else {
        treeData.push(treeNode);
      }
    }
  });

  return treeData;
}

export function getNewValue(
  value: number,
  operation?: "plus" | "minus" | "times" | "divide" | null,
  parentValue?: number,
): number | null {
  if (!value) return null;
  if (!operation || !parentValue) return value;
  let result = value;
  if (operation === "plus") {
    result = parentValue + value;
  }
  if (operation === "minus") {
    result = parentValue - value;
  }
  if (operation === "times") {
    result = parentValue * value;
  }
  if (operation === "divide") {
    result = parentValue / value;
  }
  return result;
}

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
