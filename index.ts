interface TreeNode {
  value: number;
  child: TreeNode | null;
}

function createTree(depth: number): TreeNode | null {

  if (depth === 0) return null;

  return {value: depth, child: createTree(depth - 1)};
}

console.log(createTree(3));
console.log(JSON.stringify(createTree(3), null, 2));