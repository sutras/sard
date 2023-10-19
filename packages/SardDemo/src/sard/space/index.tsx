import { FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { filterNullish, isString } from '../utils'

export type SpaceAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type SpaceJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'around'
  | 'between'
  | 'evenly'

export interface SpaceProps extends BaseProps {
  direction?: 'vertical' | 'horizontal'
  gap?: 'small' | 'medium' | 'large' | number
  align?: SpaceAlign
  justify?: SpaceJustify
  wrap?: boolean
}

const mapAlign = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
}

const mapJustify = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  around: 'space-around',
  between: 'space-between',
  evenly: 'space-evenly',
}

export const Space: FC<SpaceProps> = (props) => {
  const {
    className,
    style,
    children,

    direction = 'vertical',
    wrap,
    align = 'stretch',
    justify = 'start',
    gap = 'small',
    ...restProps
  } = props

  const [bem] = useBem('space')

  return (
    <View
      {...restProps}
      style={{
        ...style,
        ...filterNullish({
          gap: !isString(gap) ? gap : null,
          alignItems: align && mapAlign[align],
          justifyContent: justify && mapJustify[justify],
        }),
      }}
      className={classNames(
        bem.b(),
        bem.m(direction),
        bem.m(gap, isString(gap)),
        bem.m('wrap', direction === 'horizontal' && wrap),
        className,
      )}
    >
      {children}
    </View>
  )
}

export default Space
