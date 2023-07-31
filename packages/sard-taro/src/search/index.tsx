import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem, useControllableValue } from '../use'
import Input from '../input'
import Icon from '../icon'
import Button from '../button'
import { isNullish } from '../utils'

export interface SearchProps extends BaseProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  shape?: 'round' | 'square'
  background?: string
  inputBackground?: string
  readOnly?: boolean
  disabled?: boolean
  align?: 'left' | 'center' | 'right'
  cancel?: ReactNode
  onCancel?: () => void
  search?: ReactNode
  onSearch?: (value: string) => void
  prepend?: ReactNode
  append?: ReactNode
  inputPrepend?: ReactNode
  inputAppend?: ReactNode
}

export const Search: FC<SearchProps> = (props) => {
  const {
    className,
    style,
    value,
    defaultValue,
    onChange,
    placeholder,
    shape = 'square',
    background,
    inputBackground,
    readOnly,
    disabled,
    align,
    cancel,
    onCancel,
    search,
    onSearch,
    prepend,
    append,
    inputPrepend,
    inputAppend,
    ...restProps
  } = props

  const [bem] = useBem('search')

  const [innerValue, setInnerValue] = useControllableValue({
    value,
    defaultValue,
    trigger: onChange,
  })

  const handleConfirm = () => {
    onSearch?.(innerValue)
  }

  const handleCancel = () => {
    setInnerValue('')
    onCancel?.()
  }

  const searchClass = classNames(
    bem.b(),
    bem.m('show-action', !isNullish(cancel) || !isNullish(search)),
    className,
  )

  const searchStyle = {
    background,
    ...style,
  }

  return (
    <View {...restProps} className={searchClass} style={searchStyle}>
      {prepend}
      <Input
        value={innerValue}
        onChange={setInnerValue}
        clearable
        confirmType="search"
        showClearOnlyFocus
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        prepend={
          inputPrepend ?? <Icon name="search" className={bem.e('icon')} />
        }
        append={inputAppend}
        borderless
        className={classNames(bem.e('input'), bem.em('input', shape))}
        style={{ textAlign: align, background: inputBackground }}
        onConfirm={handleConfirm}
      />
      {!isNullish(cancel) && (
        <Button type="pale-text" onClick={handleCancel}>
          {cancel}
        </Button>
      )}
      {!isNullish(search) && (
        <Button type="pale-text" onClick={handleConfirm}>
          {search}
        </Button>
      )}
      {append}
    </View>
  )
}

export default Search
