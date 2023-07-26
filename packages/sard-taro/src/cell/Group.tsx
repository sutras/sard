import { CSSProperties, FC, ReactNode, createContext, useMemo } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { BaseProps } from '../base'
import { isNullish } from '../utils'

export interface CellGroupProps extends BaseProps {
  title?: ReactNode
  label?: ReactNode
  inlaid?: boolean
  card?: boolean
  inset?: boolean
  bodyStyle?: CSSProperties
  bodyClass?: string
  footerStyle?: CSSProperties
  footerClass?: string
}

export interface CellGroupContextValue {
  bodyStyle?: CSSProperties
  bodyClass?: string
  footerStyle?: CSSProperties
  footerClass?: string
}
export const CellGroupContext = createContext<CellGroupContextValue>({})

export const CellGroup: FC<CellGroupProps> = (props) => {
  const {
    className = '',
    children,
    title,
    label,
    inlaid,
    card,
    inset,
    bodyStyle,
    bodyClass,
    footerStyle,
    footerClass,
    ...restProps
  } = props

  const cellGroupClass = classNames(
    'sar-cell-group',
    {
      'sar-cell-group-inlaid': inlaid,
      'sar-cell-group-card': card,
      'sar-cell-group-inset': inset,
    },
    className,
  )

  const context = useMemo(() => {
    return {
      bodyStyle,
      bodyClass,
      footerStyle,
      footerClass,
    }
  }, [bodyStyle, bodyClass, footerStyle, footerClass])

  return (
    <View {...restProps} className={cellGroupClass}>
      {!isNullish(title) && (
        <View className="sar-cell-group-header">
          <View className="sar-cell-group-title">{title}</View>
        </View>
      )}
      <View className="sar-cell-group-body">
        <CellGroupContext.Provider value={context}>
          {children}
        </CellGroupContext.Provider>
      </View>
      {!isNullish(label) && (
        <View className="sar-cell-group-footer">
          <View className="sar-cell-group-label">{label}</View>
        </View>
      )}
    </View>
  )
}

export default CellGroup
