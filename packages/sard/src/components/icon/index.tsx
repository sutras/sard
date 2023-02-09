import { CSSProperties, FC, useMemo } from 'react'
import classNames from 'classnames'
import { isFileUrl } from '../../utils'

export interface IconProps {
  className?: string
  style?: CSSProperties
  name?: string
  prefix?: string
  size?: string | number
  color?: string
  onClick?: () => void
}

export const Icon: FC<IconProps> = (props) => {
  const {
    className,
    style,
    name = '',
    prefix,
    size = '',
    color = '',
    ...restProps
  } = props

  const isImg = useMemo(() => {
    return isFileUrl(name)
  }, [name])

  const iconClass = classNames(
    's-icon',
    {
      [prefix]: prefix && !isImg,
      [prefix ? `${prefix}-${name}` : name]: !isImg,
    },
    className,
  )
  const iconStyle = {
    fontSize: size,
    color: color,
    ...style,
  }

  return (
    <i {...restProps} className={iconClass} style={iconStyle}>
      {isImg && <img className="s-icon-image" src={name} />}
    </i>
  )
}

export default Icon
