import { ReactNode, createContext, useContext, useMemo } from 'react'
import classNames from 'classnames'
import { Icon } from '../icon'
import { isFunction, isNullish } from '../utils'
import { SelectContext, useSelect, useSelectGroup } from './useSelect'
import { CustomWrapper, ITouchEvent, View } from '@tarojs/components'
import { useBem } from './useBem'
import { useEvent } from './useEvent'
import { BaseProps } from '../base'

type IconType = 'square' | 'circle' | 'record'

export interface InternalSelectContextValue {
  disabled?: boolean
  readOnly?: boolean
  size?: number
  type?: IconType
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
}

export const InternalSelectContext =
  createContext<InternalSelectContextValue | null>(null)

export interface InternalCheckProps extends Omit<BaseProps, 'children'> {
  children?: ReactNode | ((checked: boolean, toggle: () => void) => ReactNode)

  checked?: boolean
  defaultChecked?: boolean
  value?: any
  onChange?: (checked: boolean, value: any) => void
  disabled?: boolean
  readOnly?: boolean
  size?: number
  type?: IconType
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
  onClick?: (event: ITouchEvent) => void
}

const mapTypeIcon = {
  square: ['square', 'check-square-fill'],
  circle: ['circle', 'check-circle-fill'],
  record: ['circle', 'record-circle'],
}

export const useInternalSelect = <T extends 'single' | 'multiple'>(
  checkType: T,
  checkClass: string,
  props: InternalCheckProps,
) => {
  const {
    className,
    style,
    children,

    checked,
    defaultChecked,
    value,
    onChange,
    disabled,
    readOnly,
    size,
    type,
    icon,
    checkedColor,
    onClick,
    ...restProps
  } = props

  const [bem] = useBem(checkClass)

  const [isChecked, toggle] = useSelect(
    checkType,
    {
      defaultValue: defaultChecked,
      value: checked,
      trigger: onChange,
      initialValue: false,
    },
    value,
  )

  if (isFunction(children)) {
    return (
      <InternalSelectContext.Provider value={null}>
        {children(isChecked, toggle)}
      </InternalSelectContext.Provider>
    )
  }

  const internalContext = useContext(InternalSelectContext)

  const mergedDisabled = disabled ?? internalContext?.disabled
  const mergedReadOnly = readOnly ?? internalContext?.readOnly
  const mergedSize = size ?? internalContext?.size
  const mergedType =
    type ??
    internalContext?.type ??
    (checkType === 'single' ? 'record' : 'square')
  const mergedIcon = icon ?? internalContext?.icon
  const mergedCheckedColor = checkedColor ?? internalContext?.checkedColor

  const handleCheckboxClick = useEvent((event: ITouchEvent) => {
    if (!mergedDisabled && !mergedReadOnly) {
      toggle()
    }
    onClick?.(event)
  })

  return (
    <CustomWrapper>
      <InternalSelectContext.Provider value={null}>
        <View
          {...restProps}
          className={classNames(
            bem.b(),
            bem.m('checked', isChecked),
            bem.m('disabled', mergedDisabled),
            bem.m('readonly', mergedReadOnly),
            className,
          )}
          style={style}
          onClick={handleCheckboxClick}
        >
          {mergedIcon ? (
            mergedIcon(isChecked)
          ) : (
            <Icon
              className={classNames(
                bem.e('icon'),
                bem.em('icon', 'checked', isChecked),
              )}
              size={mergedSize}
              color={isChecked ? mergedCheckedColor : undefined}
              name={mapTypeIcon[mergedType][isChecked ? 1 : 0]}
            />
          )}
          {!isNullish(children) && (
            <View className={bem.e('label')}>{children}</View>
          )}
        </View>
      </InternalSelectContext.Provider>
    </CustomWrapper>
  )
}

export interface InternalCheckGroupProps<
  T extends 'single' | 'multiple',
  V = T extends 'single' ? any : any[],
> {
  children?: ReactNode
  value?: V
  defaultValue?: V
  onChange?: (value: V) => void
  disabled?: boolean
  readOnly?: boolean
  size?: number
  type?: IconType
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
}

export const useInternalCheckGroup = <T extends 'single' | 'multiple'>(
  checkType: T,
  props: InternalCheckGroupProps<T>,
) => {
  const {
    children,
    value,
    defaultValue,
    onChange,
    disabled,
    readOnly,
    size,
    type,
    icon,
    checkedColor,
  } = props

  const context = useSelectGroup({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () =>
      (checkType === 'single' ? '' : []) as T extends 'single' ? any : any[],
  })

  const internalContext = useMemo(() => {
    return {
      disabled,
      readOnly,
      size,
      type,
      icon,
      checkedColor,
    }
  }, [disabled, readOnly, size, type, icon, checkedColor])

  return (
    <InternalSelectContext.Provider value={internalContext}>
      <SelectContext.Provider value={context}>
        {children}
      </SelectContext.Provider>
    </InternalSelectContext.Provider>
  )
}
