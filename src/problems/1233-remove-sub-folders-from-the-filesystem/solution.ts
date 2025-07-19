type TrieNode = {
  children: Record<string, TrieNode>;
  isEnd: boolean;
};

function addToTree(tree: TrieNode, folder: string) {
  const pathArray = folder.slice(1).split('/');

  let currentNode = tree;
  for (const pathItem of pathArray) {
    if (!currentNode.children[pathItem]) {
      currentNode.children[pathItem] = { children: {}, isEnd: false };
    }
    currentNode = currentNode.children[pathItem];
  }

  currentNode.isEnd = true;
}

function isSubFolder(tree: TrieNode, folder: string) {
  const pathArray = folder.slice(1).split('/');

  let currentNode = tree;
  for (const pathItem of pathArray) {
    if (currentNode.isEnd) {
      return true;
    }
    currentNode = currentNode.children[pathItem];
  }

  return false;
}

export function removeSubfolders(folder: string[]): string[] {
  const root: TrieNode = { children: {}, isEnd: false };

  for (const folderItem of folder) {
    addToTree(root, folderItem);
  }

  return folder.filter((folderItem) => !isSubFolder(root, folderItem));
}
