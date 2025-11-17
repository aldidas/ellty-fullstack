"use client";

import { useState } from "react";
import HomeForm from "@/components/home/form";
import { Button } from "@/components/ui/button";
import { mapSymbol, type TreeNode } from "@/lib/tree-utils";

interface TreeProps {
  treeData: TreeNode[];
}

export default function Tree({ treeData }: TreeProps) {
  const [replyingToNodeId, setReplyingToNodeId] = useState<string | null>(null);

  function handleReplyClick(nodeId: string): void {
    setReplyingToNodeId(nodeId);
  }

  function handleCancelClick(): void {
    setReplyingToNodeId(null);
  }

  return (
    <div className="space-y-4">
      {treeData.map((node) => (
        <div key={node.id} className="pl-4">
          <div className="flex items-center space-x-4 p-2 rounded-md bg-white shadow-sm">
            <div className="flex-grow">
              <div className="flex justify-start items-center space-x-2">
                {node.operation && node.leftNumber && (
                  <p className="text-gray-500">
                    <span className="text-lg">{mapSymbol(node.operation)}</span>
                    {" "}
                    {node.leftNumber} =
                  </p>
                )}
                <p className="font-bold text-lg">{node.number}</p>
              </div>
              <p className="text-sm text-gray-500">by: {node.user.name}</p>
            </div>
            {replyingToNodeId !== node.id && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReplyClick(node.id)}
              >
                Reply
              </Button>
            )}
          </div>

          {replyingToNodeId === node.id && (
            <div className="mt-2">
              <HomeForm parentId={node.id} parentValue={node.number} />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelClick}
                className="mt-2"
              >
                Cancel
              </Button>
            </div>
          )}

          {node.children && node.children.length > 0 && (
            <div className="mt-4">
              <Tree treeData={node.children} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
