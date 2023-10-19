import { createContext, FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { filterNullish } from '../utils'

const mapJustify = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  around: 'space-around',
  between: 'space-between',
  evenly: 'space-evenly',
}
const mapAlign = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
}

export type RowContextValue = number | undefined

export const RowContext = createContext<RowContextValue>(undefined)

export interface RowProps extends BaseProps {
  gap?: number
  justify?: 'start' | 'center' | 'end' | 'around' | 'between' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch'
}

export const Row: FC<RowProps> = (props) => {
  const { className, style, children, gap, justify, align, ...restProps } =
    props

  const [bem] = useBem('row')

  return (
    <View
      {...restProps}
      className={classNames(bem.b(), className)}
      style={{
        ...style,
        ...filterNullish({
          justifyContent: justify && mapJustify[justify],
          alignItems: align && mapAlign[align],
          margin: gap ? -gap / 2 : null,
        }),
      }}
    >
      <RowContext.Provider value={gap}>{children}</RowContext.Provider>
    </View>
  )
}

export default Row
