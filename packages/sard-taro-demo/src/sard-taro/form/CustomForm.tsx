import { FC, createContext, useMemo } from 'react'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'
import { noop } from '../utils'
import { useEvent } from '../use'

export interface CustomFormProps extends BaseProps {
  onSubmit
  onReset
}

export const CustomFormContext = createContext({
  submit: noop,
  reset: noop,
})

export const CustomForm: FC<CustomFormProps> = (props) => {
  const { className, style, children, onSubmit, onReset, ...restProps } = props

  const handleSubmit = useEvent(() => {
    onSubmit?.()
  })
  const handleReset = useEvent(() => {
    onReset?.()
  })

  const context = useMemo(() => {
    return {
      submit: handleSubmit,
      reset: handleReset,
    }
  }, [])

  return (
    <View {...restProps} className={className} style={style}>
      <CustomFormContext.Provider value={context}>
        {children}
      </CustomFormContext.Provider>
    </View>
  )
}

export default CustomForm
