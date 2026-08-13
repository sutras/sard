import type { InjectionKey } from 'vue'
import { type DefaultProps } from '../config'

export interface TreeNaturalNode {
  title?: string | number
  key?: any
  children?: TreeNaturalNode[]
  disabled?: boolean
  isLeaf?: boolean
  [prop: string]: any
}

export interface TreeCleanNode {
  title: string | number
  key: string | number
  children?: TreeCleanNode[]
}

export interface TreeStateNode {
  title: string | number
  key: string | number
  expanded: boolean
  checked: boolean
  children?: TreeStateNode[]
  parent: TreeStateNode | null
  indeterminate: boolean
  level: number
  offsetLevel: number
  visible: boolean
  disabled: boolean
  isLeaf: boolean
  loadStatus: 'idle' | 'loading' | 'loaded'
  depth: number
}

export interface TreeNodeKeys {
  title?: string
  key?: string
  children?: string
  isLeaf?: string
}

export const defaultNodeKeys = {
  title: 'title',
  key: 'key',
  children: 'children',
  isLeaf: 'isLeaf',
}

export type TreeDropType = 'before' | 'after' | 'prepend' | 'append'
export type TreeEditType = 'addSibling' | 'addChild' | 'addRoot' | 'edit' | 'delete'

export interface TreeProps {
  data?: TreeNaturalNode[]
  nodeKeys?: TreeNodeKeys
  defaultExpandAll?: boolean
  defaultExpandedKeys?: (string | number)[]
  accordion?: boolean
  selectable?: boolean
  checkStrictly?: boolean
  singleSelectable?: boolean
  leafOnly?: boolean
  current?: string | number
  defaultCheckedKeys?: (string | number)[]
  draggable?: boolean
  editable?: boolean
  filterMode?: 'lenient' | 'strict'
  filterMethod?: (value: string, node: TreeStateNode) => boolean
  lazy?: boolean
  load?: (node?: TreeStateNode) => Promise<TreeNaturalNode[]> | TreeNaturalNode[]
  autoHeight?: boolean
  allowDrag?: (node: TreeStateNode) => boolean
  beforeDrop?: (draggingNode: TreeStateNode, dropNode: TreeStateNode, type: TreeDropType) => any
  beforeEdit?: (node: TreeStateNode, title: string, type: TreeEditType) => any
}

export const defaultTreeProps: DefaultProps<TreeProps> = {
  defaultExpandAll: false,
  filterMode: 'lenient',
  accordion: false,
  data: () => [],
}

export interface TreeEmits {
  (e: 'update:current', key: string | number, node: TreeStateNode): void
  (e: 'select', key: string | number, node: TreeStateNode): void
  (e: 'check', event: { checked: boolean; node: TreeStateNode }): void
  (e: 'node-click', event: { event: any; node: TreeStateNode }): void
}

export interface TreeExpose {
  setExpanded: (key: string | number, expanded: boolean) => void
  toggleExpanded: (key: string | number) => void
  setExpandedKeys: (keys: (string | number)[]) => void
  getExpandedKeys: () => (string | number)[]
  getCheckedKeys: () => (string | number)[]
  getHalfCheckedKeys: () => (string | number)[]
  setCheckedKeys: (keys: (string | number)[]) => void
  setChecked: (key: string | number, checked: boolean) => void
  addRootNode: () => void
  getCleanTreeData: () => TreeCleanNode[]
  filter: (searchString: string) => void
}

export interface TreeNodeProps {
  node: TreeStateNode
  index: number
}

export interface TreeBranchProps {
  nodes: TreeStateNode[]
}

export interface TreeContext {
  selectable: TreeProps['selectable']
  draggable: TreeProps['draggable']
  autoHeight: TreeProps['autoHeight']
  editable: TreeProps['editable']
  singleSelectable: TreeProps['singleSelectable']
  leafOnly: TreeProps['leafOnly']
  allowDrag: TreeProps['allowDrag']
  treeData: TreeStateNode[]
  setExpandedByNode: (node: TreeStateNode, expanded: boolean) => void
  toggleExpandedByNode: (node: TreeStateNode) => void
  setCheckedByNode: (node: TreeStateNode, checked: boolean) => void
  toggleCheck: (node: TreeStateNode, checked: boolean) => void
  levelup: (node: TreeStateNode) => any
  leveldown: (node: TreeStateNode) => any
  edit: (node: TreeStateNode, getEditRect: () => DOMRect) => void
  drop: (draggingNode: TreeStateNode, dropNode: TreeStateNode, position: number) => any
  currentKey: string | number | undefined
  singleSelect: (node: TreeStateNode) => void
  nodeClick: (node: TreeStateNode, event: any) => void
  load: TreeProps['load']
  lazy: boolean
  toTreeStateNodes: (nodes: TreeNaturalNode[], parent: TreeStateNode | null) => TreeStateNode[]
  setRenderPosition: () => void
  isRtl: boolean
  dragIndent: (
    options: TreeDragOption[],
    el: Element,
    resolver: PromiseWithResolvers<TreeDragIndent>,
  ) => void
}

export const treeContextKey = Symbol('treeContext') as InjectionKey<TreeContext>

export type TreeDragIndent = 'left' | 'right'

export interface TreeDragOption {
  icon: 'left' | 'right'
  id: TreeDragIndent
}
