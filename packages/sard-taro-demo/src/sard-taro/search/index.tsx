import { FC, ReactNode } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem, useControllableValue } from '../use'
import Input from '../input'
import Icon from '../icon'
import Button from '../button'
import { filterNullish, isNullish } from '../utils'

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

  return (
    <View
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m('show-action', !isNullish(cancel) || !isNullish(search)),
        className,
      )}
      style={{
        ...style,
        ...filterNullish({
          backgroundColor: background,
        }),
      }}
    >
      {prepend}
      <View className={bem.e('input-wrapper')}>
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
          style={filterNullish({
            textAlign: align,
            backgroundColor: inputBackground,
          })}
          onConfirm={handleConfirm}
        />
      </View>
      {!isNullish(cancel) && (
        <Button
          type="pale-text"
          className={bem.e('button')}
          onClick={handleCancel}
        >
          {cancel}
        </Button>
      )}
      {!isNullish(search) && (
        <Button
          type="pale-text"
          className={bem.e('button')}
          onClick={handleConfirm}
        >
          {search}
        </Button>
      )}
      {append}
    </View>
  )
}

export default Search
