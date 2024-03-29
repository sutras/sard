import {
  getObjectValueInDepth,
  isNullish,
  isPlainObject,
  toArray,
} from '../utils'

import {
  ErrorInfo,
  FieldErrors,
  NamePath,
  NodeData,
  ValidateOptions,
} from './type'
import { Validator, ValidateMessages } from './Validator'

import createStore from './store/createStore'
import { FormNode, isListNodeValue, isMapNodeValue } from './useNode'

export const HOOK_KEY = Symbol('HOOK_KEY')

export type FormStore = ReturnType<typeof createFormStore>

export interface FormCallbacks {
  onSuccess?: (values: Record<string, any>) => void
  onFail?: (errorInfo: ErrorInfo) => void
  onReset?: () => void
}

function createInternalStore(initialValues) {
  function reducer(previousState, value) {
    return deepMergePlainObject(
      {
        ...previousState,
      },
      value,
    )
  }

  return createStore(reducer, initialValues)
}

function deepMergePlainObject(...args: any[]) {
  const target = args[0],
    l = args.length

  let i = 1,
    options,
    name,
    src,
    copy,
    clone

  for (; i < l; i++) {
    options = args[i]
    if (!isNullish(options)) {
      for (name in options) {
        src = target[name]
        copy = options[name]

        // 防止有环
        if (target === copy) {
          continue
        }

        // 深复制
        // if (isPlainObject(src) && isMapNodeValue(copy)) {
        if (isPlainObject(src) && isPlainObject(copy)) {
          clone = { ...src }

          target[name] = deepMergePlainObject(clone, copy)
        } else if (Array.isArray(src) && isListNodeValue(copy)) {
          // forEach可以过滤数组中为<空>的值
          copy.forEach((item, index) => {
            const srcItem = src[index]
            if (isPlainObject(srcItem) && isMapNodeValue(item)) {
              src[index] = deepMergePlainObject({ ...srcItem }, item)
            } else {
              src[index] = item
            }
          })
        } else {
          target[name] = copy
        }
      }
    }
  }

  return target
}

export default function createFormStore() {
  let initialValues: Record<string, any> = {}
  let callbacks: FormCallbacks
  const validator = new Validator({})
  let rootFormNode: FormNode

  const store = createInternalStore(initialValues)

  // # 工具函数

  // 根据传入的字段名获取 FormNode 实例
  function getNodeByName(name: NamePath) {
    return rootFormNode?.getDescendantNode(name)
  }

  // 根据传入的字段名数组获取对应的一组 Field 实例
  function getNodesByName(name?: NamePath[]) {
    if (name) {
      return name.map(getNodeByName).filter(Boolean) as FormNode[]
    }

    return rootFormNode?.getAllDescendantNode()
  }

  // # 公有的

  // 获取指定节点的错误信息
  function getError(name: NamePath) {
    const node = getNodeByName(name)

    return node?.errors
  }

  // 返回所有或指定节点的错误信息
  function getErrors(name?: NamePath[]): FieldErrors[] {
    function recurse(nodes, errors) {
      nodes.forEach((node) => {
        errors.push({
          name: node.getNamePath(),
          errors: node.errors,
        })
        if (node.childNodes) {
          recurse(node.childNodes, errors)
        }
      })

      return errors
    }

    if (name) {
      return name
        .map((n) => getNodeByName(n))
        .filter(Boolean)
        .map((node) => {
          return {
            name: (node as FormNode).getNamePath(),
            errors: (node as FormNode).errors,
          }
        })
    } else {
      return recurse(rootFormNode?.childNodes || [], [])
    }
  }

  // 获取对应节点的值
  function getValue(name: NamePath) {
    return getObjectValueInDepth(getValues(), toArray(name))
  }

  // 获取一组节点对应的值
  function getValues(name?: NamePath[]) {
    if (name) {
      return deepMergePlainObject(...name.map(getValue))
    } else {
      return store.getState()
      // return rootFormNode?.getDeepValue()
    }
  }

  // 重置一组节点到初始值
  function reset(name?: NamePath[]) {
    if (name) {
      name.forEach((n) => {
        getNodeByName(n)?.reset()
      })
    } else {
      rootFormNode?.reset()
      callbacks.onReset?.()
    }
  }

  // 滚动到指定字段位置
  function scrollToField(name: NamePath, options?: ScrollIntoViewOptions) {
    const node = getNodeByName(name)
    node?.scrollToField(options)
  }

  // 设置一组字段状态
  function setNodeData(data: NodeData[]) {
    data.forEach((item) => {
      const node = item.name && getNodeByName(item.name)

      if (node) {
        if ('value' in item) {
          node.setValue(item.value)
        }
        if ('errors' in item) {
          node.setErrors(item.errors || [])
        }
      }
    })
  }

  // 设置表单的值
  function setValues(values) {
    rootFormNode?.setValueAndDeepValidate(values)
  }

  // 设置指定节点的值
  function setValue(name: NamePath, value: any) {
    const node = getNodeByName(name)
    if (node) {
      setValues(node.makeNamePathValue(value))
    }
  }

  // 验证指定的字段，不传递字段名则验证所有字段
  function validate(
    name?: NamePath[] | ValidateOptions,
    options?: ValidateOptions,
  ) {
    if (isPlainObject(name)) {
      options = name as ValidateOptions
      name = undefined
    }
    return new Promise<any>((resolve, reject) => {
      Promise.allSettled(
        getNodesByName(name as NamePath[]).map((node) =>
          node.validate(options),
        ),
      ).then((values) => {
        const rejected = values.filter(({ status }) => status === 'rejected')

        if (rejected.length === 0) {
          resolve(getValues())
        } else {
          reject({
            errorFields: rejected.map(({ reason: { name, errors } }: any) => ({
              name,
              errors,
            })),
            values: getValues(),
          })
        }
      })
    })
  }

  // 提交表单，与点击 submit 按钮效果相同
  function submit() {
    return validate({
      triggerName: 'onSubmit',
    })
      .then((values) => {
        callbacks.onSuccess?.(values)
      })
      .catch((errors: ErrorInfo) => {
        callbacks.onFail?.(errors)
      })
  }

  // # 私有的

  // 关联表单节点
  function relateFormNode(node: FormNode) {
    rootFormNode = node
  }

  // 设置表单初始值
  function setInitialValues(
    values: Record<string, any> = {},
    onlyCacheValues: boolean,
  ) {
    initialValues = values
    if (!onlyCacheValues) {
      const value = rootFormNode?.getDeepInitialValue()
      setValues(deepMergePlainObject(value, initialValues))
    }
  }

  // 获取表单初始值
  function getFormInitialValues() {
    return initialValues
  }

  // 设置表单回调函数
  function setCallbacks(cbs: FormCallbacks) {
    callbacks = cbs
  }

  // 设置表单的验证提示模板
  function setValidateMessages(validateMessages: ValidateMessages) {
    validator.setValidateMessages(validateMessages)
  }

  const internalHooks = {
    relateFormNode,
    setInitialValues,
    setCallbacks,
    getFormInitialValues,
    setValidateMessages,
    validator,
    store,
  }

  function getInternalHooks<K extends typeof HOOK_KEY>(
    hookKey: K,
  ): K extends typeof HOOK_KEY ? typeof internalHooks : null {
    return HOOK_KEY === hookKey ? (internalHooks as any) : null
  }

  return {
    getError,
    getErrors,
    getValue,
    getValues,
    scrollToField,
    setNodeData,
    setValues,
    setValue,
    validate,
    submit,
    reset,

    getInternalHooks,
  }
}
