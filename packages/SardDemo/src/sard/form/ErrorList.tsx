import { FC } from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { useBem } from '../use'

export interface FormErrorListProps {
  errors?: string[]
}

export const FormErrorList: FC<FormErrorListProps> = (props) => {
  const { errors } = props

  const [bem] = useBem('form-field')

  if (!errors) {
    return null
  }

  return (
    <>
      {errors.map((error, index) => {
        return (
          <View
            key={index}
            className={classNames(
              bem.e('feedback'),
              bem.em('feedback', 'failed'),
            )}
          >
            {error}
          </View>
        )
      })}
    </>
  )
}

export default FormErrorList
