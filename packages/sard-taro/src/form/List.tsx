import { FC, ReactNode, useRef } from 'react'
import { arrayMove, isFunction, arrayRemoveAtIndexes, toArray } from '../utils'
import { Rule } from './Validator'
import { AnyType } from '../base'
import { useEvent } from '../use'
import { ValidateStatus, NamePath, NodeName } from './type'
import { useNode } from './useNode'
import { NodeContext } from './NodeContext'
import useInternalWatch from './useInternalWatch'

export interface FormListField {
  key: number | string
  name: number
}

export interface FormListOperations {
  add: (defaultValue?: AnyType, insertIndex?: number) => void
  move: (from: number, to: number) => void
  remove: (index: number | number[]) => void
}

export interface FormListMeta {
  errors: string[]
  required: boolean
  validateStatus: ValidateStatus
}

export interface FormListProps {
  children?: (
    fields: FormListField[],
    operation: FormListOperations,
    meta: FormListMeta,
  ) => ReactNode
  required?: boolean

  name: NodeName
  initialValue?: AnyType[]

  label?: ReactNode
  rules?: Rule[]
  validateFirst?: boolean
  validateStatus?: ValidateStatus

  watch?: NamePath[]
}

export const FormList: FC<FormListProps> = (props) => {
  const {
    children,
    required,
    name,
    label,
    initialValue,
    rules,
    validateFirst,
    validateStatus,
    watch,
  } = props

  useInternalWatch(watch)

  const [node] = useNode({
    type: 'list',
    name,
    label,
    initialValue,
    rules,
    validateFirst,
    validateStatus,
    required,
  })

  const {
    value: mayNullishValue,
    setValueAndValidate,
    errors,
    finalRequired,
    finalValidateStatus,
  } = node

  const value = Array.isArray(mayNullishValue) ? mayNullishValue : []

  // operation

  const increment = useRef(0)
  const keys = useRef([])

  const add = useEvent((defaultValue: AnyType, insertIndex?: number) => {
    const nextValue = [...value]
    nextValue.splice(insertIndex ?? value.length, 0, defaultValue)
    keys.current.splice(insertIndex ?? value.length, 0, increment.current++)
    setValueAndValidate(nextValue)
  })

  const move = useEvent((from: number, to: number) => {
    if (
      from === to ||
      from < 0 ||
      from >= value.length ||
      to < 0 ||
      to >= value.length
    ) {
      return
    }

    arrayMove(keys.current, from, to)
    setValueAndValidate(arrayMove([...value], from, to))
  })

  const remove = useEvent((index: number | number[]) => {
    const mergedIndex = toArray(index)

    const nextValue = value.filter((_, index) => {
      return !mergedIndex.includes(index)
    })

    if (nextValue.length !== value.length) {
      arrayRemoveAtIndexes(keys.current, mergedIndex)
      setValueAndValidate([])
      setValueAndValidate(nextValue)
    }
  })

  return (
    <NodeContext.Provider value={node}>
      {isFunction(children)
        ? children(
            value.map((_, index) => {
              let key = keys.current[index]
              if (key === undefined) {
                key = keys.current[index] = increment.current++
              }

              return {
                name: index,
                key,
              }
            }),
            {
              add,
              remove,
              move,
            },
            {
              errors,
              required: finalRequired,
              validateStatus: finalValidateStatus,
            },
          )
        : null}
    </NodeContext.Provider>
  )
}

export default FormList
