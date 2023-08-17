import { FC } from 'react'
import classNames from 'classnames'
import { useBem } from '../use'
import { Popout, PopoutProps } from '../popout'
import { Input, InputProps } from '../input'
import Icon from '../icon'
import { isNullish } from '../utils'

export interface PopoutInputProps extends PopoutProps {
  inputProps?: InputProps
}

export const PopoutInput: FC<PopoutInputProps> = (props) => {
  const { className, children, inputProps, disabled, readOnly, ...restProps } =
    props

  const [bem] = useBem('popout-input')

  return (
    <Popout {...restProps} className={classNames(bem.b(), className)}>
      <Popout.Outlet>
        {({ outletValue, setVisible }) => {
          return (
            <Input
              inlaid
              value={isNullish(outletValue) ? '' : String(outletValue)}
              disabled={disabled}
              append={<Icon className={bem.e('arrow')} name="caret-right" />}
              {...inputProps}
              onClick={(event) => {
                if (!disabled && !readOnly) {
                  setVisible(true)
                }
                inputProps?.onClick?.(event)
              }}
              readOnly
              className={classNames(bem.b(), inputProps?.className)}
            />
          )
        }}
      </Popout.Outlet>
      <Popout.Target>{children}</Popout.Target>
    </Popout>
  )
}

export default PopoutInput
