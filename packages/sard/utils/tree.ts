import { isNoEmptyArray } from './is'

type TNode = {
  children?: TNode[]
  parent: TNode | null
  checked: boolean
  indeterminate: boolean
  key: number | string
  [k: string]: any
}

export function walkDescendant<T extends TNode>(
  node: T,
  callback: (node: T) => boolean | void | undefined,
) {
  if (!callback(node) && node.children) {
    node.children.forEach((node) => {
      walkDescendant(node as T, callback)
    })
  }
}

export function walkAncestor<T extends TNode>(node: T | null, callback: (node: T) => void) {
  if (node) {
    callback(node)
    walkAncestor(node.parent as T, callback)
  }
}

export function walkNodes<T extends TNode>(
  nodes: T[],
  callback: (node: T) => void,
): void | boolean {
  nodes.forEach((node) => {
    callback(node)
    if (node.children) {
      walkNodes(node.children as T[], callback)
    }
  })
}

export function getNodeLevel<T extends TNode>(node: T) {
  let level = 0
  while (node.parent) {
    level++
    node = node.parent as T
  }
  return level
}

export function setCheckedRecursively<T extends TNode>(
  node: T,
  checked: boolean,
  strictly?: boolean,
) {
  if (strictly) {
    node.checked = checked
  } else {
    walkDescendant(node, (node) => {
      node.checked = checked
      node.indeterminate = false
    })
    updateAncestorsChecked(node.parent)
  }
}

export function updateAncestorsChecked<T extends TNode>(parentNode: T | null, strictly?: boolean) {
  if (!strictly) {
    walkAncestor(parentNode, (node) => {
      const children = node.children || []
      const numChecked = children.filter((node) => node.checked).length
      node.checked = numChecked > 0 && numChecked === children.length
      node.indeterminate =
        !node.checked && (numChecked > 0 || children.some((node) => node.indeterminate))
    })
  }
}

export function initializeCheckNodes<T extends TNode>(
  nodes: T[],
  treeMap: Record<string | number, T>,
  keys: (string | number)[],
  strictly?: boolean,
) {
  if (strictly) {
    const mapKeys = keys.reduce<Record<string | number, true>>((map, key) => {
      map[key] = true
      return map
    }, {})

    walkNodes(nodes, (node) => {
      node.checked = mapKeys[node.key] ? true : false
    })
  } else {
    walkNodes(nodes, (node) => {
      node.checked = false
      node.indeterminate = false
    })

    keys.forEach((key) => {
      const node = treeMap[key]
      if (node && !node.checked) {
        setCheckedRecursively(node, true, strictly)
      }
    })
  }
}

export function getTreeCheckedKeys<T extends TNode>(nodes: T[]) {
  const checkedKeys: (number | string)[] = []
  walkNodes(nodes, (node) => {
    if (node.checked) {
      checkedKeys.push(node.key)
    }
  })
  return checkedKeys
}

export function getTreeHalfCheckedKeys<T extends TNode>(nodes: T[]) {
  const halfCheckedKeys: (number | string)[] = []
  walkNodes(nodes, (node) => {
    if (node.indeterminate) {
      halfCheckedKeys.push(node.key)
    }
  })
  return halfCheckedKeys
}

/**
 * 将嵌套的列配置转换为可以跨多行和多列的表格
 */
export function mapTreeToGrid<T, R>(
  columns: T[],
  map: (col: T, rowspan: number, colspan: number, left: number, right: number) => R,
  childrenKey: keyof T = 'children' as keyof T,
) {
  if (!isNoEmptyArray(columns)) {
    return []
  }

  const maxDepth = getMaxDepth(columns, childrenKey)

  // 初始化结果数组，按层级分组
  const result = Array.from<unknown, R[]>({ length: maxDepth }, () => [])

  // 递归处理每个节点，返回 { colspan, left }
  function processNode(col: T, level = 0, left = 0) {
    const hasChildren = isNoEmptyArray(col[childrenKey])

    if (!hasChildren) {
      // 叶子节点：colspan为1，rowspan为剩余层级数
      const remainingLevels = maxDepth - level
      result[level].push(map(col, remainingLevels, 1, left, left + 1))
      return { colspan: 1, left }
    }

    // 非叶子节点：先递归处理所有子节点
    const children = col[childrenKey] as T[]
    let childLeft = left
    let totalColspan = 0

    for (const child of children) {
      const { colspan } = processNode(child, level + 1, childLeft)
      childLeft += colspan
      totalColspan += colspan
    }

    // 当前节点占据一行，rowspan为1，colspan为所有子节点的总和
    result[level].push(map(col, 1, totalColspan, left, left + totalColspan))

    return { colspan: totalColspan, left }
  }

  // 处理所有根节点
  let currentLeft = 0
  for (const col of columns) {
    const { colspan } = processNode(col, 0, currentLeft)
    currentLeft += colspan
  }

  return result
}

/**
 * 计算最大深度（层级数）
 */
function getMaxDepth<T>(cols: T[], childrenKey: keyof T) {
  let maxDepth = 1
  for (const col of cols) {
    if (isNoEmptyArray(col[childrenKey])) {
      const childDepth = getMaxDepth(col[childrenKey] as T[], childrenKey) + 1
      maxDepth = Math.max(maxDepth, childDepth)
    }
  }
  return maxDepth
}

/**
 * 获取树形结构中的所有叶子节点
 */
export function getLeafNodes<T>(tree: T[], childrenKey: keyof T = 'children' as keyof T) {
  const result: T[] = []

  function traverse(node: T) {
    // 如果没有子节点或子节点为空，则是叶子节点
    if (isNoEmptyArray(node[childrenKey])) {
      // 递归遍历所有子节点
      for (const child of node[childrenKey]) {
        traverse(child)
      }
    } else {
      result.push(node)
    }
  }

  // 遍历根节点
  for (const node of tree) {
    traverse(node)
  }

  return result
}
