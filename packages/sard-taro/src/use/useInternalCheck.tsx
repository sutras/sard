import {
  CSSProperties,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react'
import classNames from 'classnames'
import { Icon } from '../icon'
import { isFunction, isNullish } from '../utils'
import { CheckContext, useCheck, useCheckGroup } from './useCheck'
import { CustomWrapper, ITouchEvent, View } from '@tarojs/components'
import { useBem } from './useBem'

type IconType = 'square' | 'circle' | 'record'

type ValueType = any

export interface InternalCheckContextValue {
  disabled?: boolean
  readOnly?: boolean
  size?: string | number
  type?: IconType
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
}

export const InternalCheckContext =
  createContext<InternalCheckContextValue>(null)

export interface InternalCheckProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode | ((checked: boolean, toggle: () => void) => ReactNode)
  checked?: boolean
  defaultChecked?: boolean
  value?: ValueType
  disabled?: boolean
  readOnly?: boolean
  size?: string | number
  type?: IconType
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
  onChange?: (checked: boolean, value: ValueType) => void
  onClick?: (event: ITouchEvent) => void
}

const mapTypeIcon = {
  square: ['square', 'check-square-fill'],
  circle: ['circle', 'check-circle-fill'],
  record: ['circle', 'record-circle'],
}

export const useInternalCheck = <T extends 'single' | 'multiple'>(
  checkType: T,
  checkClass: string,
  props: InternalCheckProps,
) => {
  const {
    className,
    children,
    checked,
    defaultChecked,
    value,
    disabled,
    readOnly,
    size,
    type,
    onChange,
    onClick,
    icon,
    checkedColor,
    ...restProps
  } = props

  const [bem] = useBem(checkClass)

  const [isChecked, toggle] = useCheck(
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
      <InternalCheckContext.Provider value={null}>
        {children(isChecked, toggle)}
      </InternalCheckContext.Provider>
    )
  }

  const internalContext = useContext(InternalCheckContext)

  const mergedDisabled = disabled ?? internalContext?.disabled
  const mergedReadOnly = readOnly ?? internalContext?.readOnly
  const mergedSize = size ?? internalContext?.size
  const mergedType =
    type ??
    internalContext?.type ??
    (checkType === 'single' ? 'record' : 'square')
  const mergedIcon = icon ?? internalContext?.icon
  const mergedCheckedColor = checkedColor ?? internalContext?.checkedColor

  const handleCheckboxClick = (event: ITouchEvent) => {
    if (!mergedDisabled && !mergedReadOnly) {
      toggle()
    }
    onClick?.(event)
  }

  return (
    <CustomWrapper>
      <InternalCheckContext.Provider value={null}>
        <View
          {...restProps}
          className={classNames(
            bem.b(),
            bem.m('checked', isChecked),
            bem.m('disabled', mergedDisabled),
            bem.m('readonly', mergedReadOnly),
            className,
          )}
          onClick={handleCheckboxClick}
        >
          <View
            className={classNames(
              bem.e('icon'),
              bem.em('icon', 'checked', isChecked),
            )}
            style={{
              fontSize: mergedSize,
              color: isChecked ? mergedCheckedColor : '',
            }}
          >
            {mergedIcon ? (
              mergedIcon(isChecked)
            ) : (
              <Icon name={mapTypeIcon[mergedType][isChecked ? 1 : 0]}></Icon>
            )}
          </View>
          {!isNullish(children) && (
            <View className={bem.e('label')}>{children}</View>
          )}
        </View>
      </InternalCheckContext.Provider>
    </CustomWrapper>
  )
}

export interface InternalCheckGroupProps<
  T extends 'single' | 'multiple',
  V = T extends 'single' ? ValueType : ValueType[],
> {
  children?: ReactNode
  value?: V
  defaultValue?: V
  disabled?: boolean
  readOnly?: boolean
  size?: string | number
  type?: IconType
  icon?: (checked: boolean) => ReactNode
  checkedColor?: string
  onChange?: (value: V) => void
}

export const useInternalCheckGroup = <T extends 'single' | 'multiple'>(
  checkType: T,
  props: InternalCheckGroupProps<T>,
) => {
  const {
    value,
    defaultValue,
    disabled,
    readOnly,
    size,
    type,
    icon,
    checkedColor,
    children,
    onChange,
  } = props

  const context = useCheckGroup({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () =>
      (checkType === 'single' ? '' : []) as T extends 'single'
        ? ValueType
        : ValueType[],
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
    <InternalCheckContext.Provider value={internalContext}>
      <CheckContext.Provider value={context}>{children}</CheckContext.Provider>
    </InternalCheckContext.Provider>
  )
}
