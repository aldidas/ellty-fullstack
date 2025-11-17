"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { nodeSchema } from "@/lib/schemas/tree";
import { getSession } from "@/lib/actions/auth";
import { fromErrorToFormState, type FormState, initialState } from "@/lib/utils";
import { generateTree, getNewValue } from "@/lib/tree-utils";
import { Prisma } from "@/generated/client";

export async function getAllNodes() {
  const nodes: Prisma.TreeGetPayload<{
    include: {
      user: true;
    };
  }>[] = await prisma.tree.findMany({
    include: {
      user: true,
    },
  });
  const treeData = generateTree(nodes);
  return treeData;
}

export async function createNode(
  _: FormState | undefined,
  formData: FormData,
): Promise<FormState | undefined> {
  const session = await getSession();
  if (!session) {
    throw new Error("Not permitted");
  }

  const value = formData.get("value");
  const parentId = formData.get("parentId");
  const operation = formData.get("operation");
  const nodeData = nodeSchema.safeParse({
    value,
    parentId,
    operation,
  });

  if (!nodeData.success) {
    return fromErrorToFormState(nodeData.error, formData);
  }

  try {
    let parentValue: number | undefined;
    if (nodeData.data.parentId) {
      const parentNode = await prisma.tree.findUnique({
        where: {
          id: nodeData.data.parentId,
        },
      });
      parentValue = parentNode?.number;
      if (!parentNode) {
        throw new Error("Parent Node is not exist.");
      }
    }
    const nodeNumber = getNewValue(
      nodeData.data.value,
      nodeData.data.operation,
      parentValue,
    );
    if (!nodeNumber) {
      throw new Error("Failed to calculate number.");
    }
    const newTree: Prisma.TreeCreateInput = {
      id: crypto.randomUUID(),
      user: {
        connect: { id: session.user.id },
      },
      number: nodeNumber,
      operation: nodeData.data.operation,
      leftNumber: nodeData.data.value,
    };
    if (nodeData.data.parentId) {
      newTree.parent = { connect: { id: nodeData.data.parentId } };
    }
    await prisma.tree.create({
      data: newTree,
    });
  } catch (error) {
    return fromErrorToFormState(error, formData);
  }
  revalidatePath("/");
  return {
    ...initialState,
    status: "SUCCESS",
    message: "Node created successfully",
  };
}
