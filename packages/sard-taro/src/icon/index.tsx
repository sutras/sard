import { FC, useMemo } from 'react'
import { ITouchEvent, Image, View } from '@tarojs/components'
import classNames from 'classnames'
import { isFileUrl } from '../utils'
import { BaseProps } from '../base'
import { useBem } from '../use'

export interface IconProps extends BaseProps {
  name?: string
  prefix?: string
  size?: string | number
  color?: string
  onClick?: (event: ITouchEvent) => void
}

export const Icon: FC<IconProps> = (props) => {
  const {
    className,
    style,
    name = '',
    prefix = 'sari',
    size = '',
    color = '',
    ...restProps
  } = props

  const [bem] = useBem('icon')

  const isImg = useMemo(() => {
    return isFileUrl(name)
  }, [name])

  const iconClass = classNames(
    bem.b(),
    {
      [prefix]: prefix && !isImg,
      [prefix ? `${prefix}-${name}` : name]: name && !isImg,
    },
    className,
  )
  const iconStyle = {
    fontSize: size,
    color: color,
    ...style,
  }

  return (
    <View {...restProps} className={iconClass} style={iconStyle}>
      {isImg && <Image className={bem.e('image')} src={name} />}
    </View>
  )
}

export default Icon
