import { FC, ReactNode, useRef } from 'react'
import { arrayMove, toArray } from '../utils'
import FormItem from './Item'
import { Rule } from './Validator'
import { AnyType } from '../base'

export interface FormListOperations {
  add: (defaultValue?: AnyType, insertIndex?: number) => void
  move: (from: number, to: number) => void
  remove: (index: number | number[]) => void
}

interface Field {
  key: number | string
  name: number | string
  isListField: boolean
}

export interface FormListProps {
  children?: (fields: Field[], operation: FormListOperations) => ReactNode
  initialValue?: AnyType[]
  name?: string
  rules?: Rule[]
}

export const FormList: FC<FormListProps> = (props) => {
  const { children, initialValue, name, rules } = props

  const increment = useRef(0)
  const keys = useRef([])

  return (
    <FormItem initialValue={initialValue} name={name} rules={rules} noStyle>
      {({ value = [], onChange }) => {
        const operations: FormListOperations = {
          add: (defaultValue, insertIndex) => {
            const nextValue = value.slice()
            nextValue.splice(insertIndex ?? value.length, 0, defaultValue)
            keys.current.splice(
              insertIndex ?? value.length,
              0,
              increment.current++,
            )
            onChange(nextValue)
          },

          move: (from, to) => {
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
            onChange(arrayMove(value, from, to))
          },

          remove: (index) => {
            const mergedIndex = toArray(index)

            const nextValue = value.filter((_, index) => {
              return !mergedIndex.includes(index)
            })

            if (nextValue.length !== value.length) {
              keys.current = keys.current.filter(
                (_, index) => !mergedIndex.includes(index),
              )
              onChange(nextValue)
            }
          },
        }

        return (
          <>
            {children(
              value.map((_, index) => {
                let key = keys.current[index]
                if (key === undefined) {
                  key = keys.current[index] = increment.current++
                }

                return {
                  name: index,
                  key,
                  isListField: true,
                }
              }),
              operations,
            )}
          </>
        )
      }}
    </FormItem>
  )
}

export default FormList
