import { ReactNode, useContext, useLayoutEffect, useMemo, useRef } from 'react'
import { useEvent } from '../use'
import { useSelector } from './store/useSelector'
import {
  getObjectValueInDepth,
  isNullish,
  isNumber,
  isPlainObject,
  isUndefined,
  noop,
  toArray,
} from '../utils'
import FieldContext from './FieldContext'
import { FormStore, HOOK_KEY } from './createFormStore'
import { Rule } from './Validator'
import { NamePath, NodeName, ValidateOptions, ValidateStatus } from './type'
import useValidator from './useValidator'
import { useDispatch } from './store/useDispatch'
import { NodeContext } from './NodeContext'
import { Store } from './store/createStore'

const listSymbol = Symbol('LIST_NODE_SYMBOL')
const mapSymbol = Symbol('MAP_NODE_SYMBOL')

function markListNodeValue(list: any[]) {
  list[listSymbol] = true
  return list
}

function markMapNodeValue(map: object) {
  map[mapSymbol] = true
  return map
}

export function isListNodeValue(list?: any[]) {
  return Array.isArray(list) && list[listSymbol]
}

export function isMapNodeValue(map?: object) {
  return (isPlainObject(map) as unknown as object) && map[mapSymbol]
}

export type FormNodeType = 'list' | 'map' | 'field' | 'form'

export interface FormNode {
  type: FormNodeType
  name: NodeName
  value: any
  parentNode: FormNode
  childNodes: FormNode[]
  data: Record<string, any>
  appendChild: (node: FormNode) => void
  removeChild: (node: FormNode) => void
  getNamePath: () => NodeName[]
  makeNamePathValue: (value: any) => any
  getDescendantNode: (name: NamePath) => FormNode | null
  getAllDescendantNode: () => FormNode[]
  getInitialValue: () => any
  getDeepInitialValue: () => any
  getDeepValue: () => any
  setValue: (value: any) => void
  setValueAndValidate: (value: any) => void
  setValueAndDeepValidate: (value: any) => void
  reset: () => void
  dispatch: (value: any) => void
  validate: (options?: ValidateOptions) => Promise<void>
  errors: string[]
  finalRequired: boolean
  finalValidateStatus: ValidateStatus
  setErrors: (errors: string[]) => void
  scrollToField: (options?: ScrollIntoViewOptions) => void
}

export function getNamePathByCurrentName(
  name: number | string,
  parentNode: FormNode,
) {
  const namePath = [name]
  let currentParentNode = parentNode

  while (currentParentNode && currentParentNode.type !== 'form') {
    if (!isNullish(currentParentNode.name)) {
      namePath.unshift(currentParentNode.name)
    }

    currentParentNode = currentParentNode.parentNode
  }

  return namePath
}

function getUnFieldParentNode(parentNode: FormNode) {
  let currentParentNode = parentNode
  while (currentParentNode && currentParentNode.type === 'field') {
    currentParentNode = currentParentNode.parentNode
  }
  return currentParentNode
}

export function useNode(options: {
  store?: Store
  formStore?: FormStore
  type: FormNodeType
  name?: NodeName
  label?: ReactNode
  initialValue?: any
  rules?: Rule[]
  validateFirst?: boolean
  validateStatus?: ValidateStatus
  required?: boolean
}) {
  const {
    store,
    formStore: externalFormStore,
    type,
    name,
    label,
    initialValue,
    rules,
    validateFirst,
    validateStatus,
    required,
  } = options

  const dispatch = useDispatch(store)

  const mayParentNode = useContext(NodeContext)

  const parentNode = useMemo(() => {
    return getUnFieldParentNode(mayParentNode)
  }, [mayParentNode])

  const value = useSelector((state) => {
    if (!isNullish(name)) {
      const namePath = getNamePathByCurrentName(name, parentNode)
      return getObjectValueInDepth(state, namePath)
    }
  }, store)

  const getNamePath = useEvent(() => {
    return getNamePathByCurrentName(name, parentNode)
  })

  const fieldContext = useContext(FieldContext)

  const formStore = externalFormStore || fieldContext.formStore

  const { getFormInitialValues } = formStore.getInternalHooks(HOOK_KEY)

  const {
    validate,
    finalRequired,
    finalValidateStatus,
    setInnerValidateStatus: setValidateStatus,
    errors,
    setErrors,
  } = useValidator({
    formStore,
    rules,
    validateFirst,
    validateStatus,
    value,
    name,
    label,
    required,
    getNamePath,
  })

  const data = useRef<Record<string, any>>({})

  useLayoutEffect(() => {
    if (data.current.shouldValidate) {
      data.current.shouldValidate = false
      validate().catch(noop)
    }
  }, [value])

  const childNodes = useRef<FormNode[]>([])

  const appendChild = useEvent((node: FormNode) => {
    childNodes.current.push(node)
  })

  const removeChild = useEvent((node: FormNode) => {
    const index = childNodes.current.indexOf(node)
    if (index !== -1) {
      childNodes.current.splice(index, 1)
    }
  })

  const makeNamePathValue = useEvent((value: any) => {
    let currentValue = value
    let currentName = name
    let currentParentNode = parentNode

    while (currentParentNode) {
      const parentNodeName = currentParentNode.name
      const parentNodetype = currentParentNode.type

      if (parentNodetype === 'form' || !isNullish(parentNodeName)) {
        switch (parentNodetype) {
          case 'map':
          case 'form':
            currentValue = markMapNodeValue({
              [currentName]: currentValue,
            })
            break
          case 'list': {
            const list = markListNodeValue([])
            list[currentName] = currentValue
            currentValue = list
          }
        }

        currentName = parentNodeName
      }

      currentParentNode = currentParentNode.parentNode
    }

    return currentValue
  })

  const getDescendantNode = useEvent((name: NamePath) => {
    let currentChildNodes = childNodes.current
    let currentNode: FormNode = null
    for (const key of toArray(name)) {
      currentNode = null
      for (let l = currentChildNodes.length, i = l - 1; i >= 0; i--) {
        const node = currentChildNodes[i]
        if (node.name === key) {
          currentChildNodes = node.childNodes
          currentNode = node
          break
        }
      }
      if (!currentNode) {
        return null
      }
    }
    return currentNode
  })

  const getAllDescendantNode = useEvent(() => {
    const nodes: FormNode[] = []

    function recurse(childNodes) {
      childNodes.forEach((node) => {
        nodes.push(node)
        recurse(node.childNodes)
      })
    }
    recurse(childNodes.current)

    return nodes
  })

  const getInitialValue = useEvent(() => {
    const rootInitialValue = getObjectValueInDepth(
      getFormInitialValues(),
      getNamePath(),
    )
    return isUndefined(rootInitialValue) ? initialValue : rootInitialValue
  })

  const getDeepInitialValue = useEvent(() => {
    switch (type) {
      case 'field':
        return getInitialValue()

      case 'map':
      case 'form':
        return childNodes.current.reduce((value, childNode) => {
          if (!isNullish(childNode.name)) {
            value[childNode.name] = childNode.getDeepInitialValue()
          }
          return value
        }, markMapNodeValue({}))

      case 'list': {
        const listValue = childNodes.current.map((childNode) => {
          return childNode.getDeepInitialValue()
        })
        return markListNodeValue(listValue)
      }
    }
  })

  const getDeepValue = useEvent(() => {
    switch (type) {
      case 'field':
        return value

      case 'map':
      case 'form':
        return childNodes.current.reduce((value, childNode) => {
          if (!isNullish(childNode.name)) {
            value[childNode.name] = childNode.getDeepValue()
          }
          return value
        }, {})

      case 'list': {
        return childNodes.current.map((childNode) => {
          return childNode.getDeepValue()
        })
      }
    }
  })

  const setValue = useEvent((value) => {
    if (type === 'map' || type === 'form') {
      if (!isPlainObject(value)) {
        value = markMapNodeValue({})
      }
    } else if (type === 'list') {
      if (!Array.isArray(value)) {
        value = markListNodeValue([])
      }
    }

    dispatch(makeNamePathValue(value))
  })

  const setValueAndValidate = useEvent((value) => {
    setValue(value)

    data.current.shouldValidate = true
  })

  const setValueAndDeepValidate = useEvent((value) => {
    setValue(value)

    getAllDescendantNode().forEach((node) => {
      if (node.errors?.length > 0) {
        node.data.shouldValidate = true
      }
    })
  })

  const reset = useEvent(() => {
    setValue(getInitialValue())
    setErrors([])
    setValidateStatus('unvalidated')

    childNodes.current.forEach((node) => {
      node.reset()
    })
  })

  const scrollToField = useEvent((options?: ScrollIntoViewOptions) => {
    if (type === 'field') {
      data.current.scrollToField?.(options)
    }
  })

  const node: FormNode = useMemo<FormNode>(() => {
    return {
      type,
      name,
      value,
      parentNode,
      childNodes: childNodes.current,
      data: data.current,
      appendChild,
      removeChild,
      getNamePath,
      makeNamePathValue,
      getDescendantNode,
      getAllDescendantNode,
      getInitialValue,
      getDeepInitialValue,
      getDeepValue,
      setValue,
      setValueAndValidate,
      setValueAndDeepValidate,
      reset,
      dispatch,
      validate,
      errors,
      finalRequired,
      finalValidateStatus,
      setErrors,
      scrollToField,
    }
  }, [])

  node.name = name
  node.value = value
  node.parentNode = parentNode
  node.errors = errors
  node.finalRequired = finalRequired
  node.finalValidateStatus = finalValidateStatus

  useMemo(() => {
    if (parentNode && !isNullish(name)) {
      // 与dom排列顺序保持一致
      if (parentNode.type === 'list' && isNumber(name)) {
        parentNode.childNodes.splice(name, 0, node)
      } else {
        parentNode.appendChild(node)
      }
    }
  }, [])

  useLayoutEffect(() => {
    return () => {
      if (parentNode && !isNullish(name)) {
        parentNode.removeChild(node)
      }
    }
  }, [])

  return [node]
}
