import { forwardRef, useContext } from 'react'
import { View } from '@tarojs/components'
import { BaseProps } from '../base'
import { CustomFormContext } from '../form/CustomForm'
import { useEvent } from '../use'

export interface CustomButtonProps extends BaseProps {
  formType?: 'submit' | 'reset'
  onClick?: (event: any) => void
  disabled?: boolean
}

export const CustomButton = forwardRef<any, CustomButtonProps>((props, ref) => {
  const {
    className,
    style,
    children,
    formType,
    onClick,
    disabled,
    ...restProps
  } = props

  const formContext = useContext(CustomFormContext)

  const handleClick = useEvent((event) => {
    if (!disabled) {
      if (formType === 'submit') {
        formContext.submit()
      } else if (formType === 'reset') {
        formContext.reset()
      }
    }

    onClick?.(event)
  })

  return (
    <View
      {...restProps}
      ref={ref}
      className={className}
      style={style}
      onClick={handleClick}
    >
      {children}
    </View>
  )
})

export default CustomButton
