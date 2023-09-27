import { ComponentType, FC, useMemo } from 'react'
import {
  ITouchEvent,
  Image,
  ImageProps,
  Text,
  TextProps,
} from '@tarojs/components'
import classNames from 'classnames'
import { addPxInWeb, filterNullish, isFileUrl, isNumber, isRN } from '../utils'
import { BaseProps } from '../base'
import { useBem } from '../use'
import { useFonts, loadFont, parseGlyphs } from './fontLoader'
import { internalFamily } from './common'

export interface IconProps extends BaseProps {
  name?: string
  family?: string
  prefix?: string
  size?: number
  color?: string
  imageMode?: ImageProps['mode']
  imageClass?: string
  onClick?: (event: ITouchEvent) => void
  _element?: ComponentType<TextProps>
}

const internalPrefix = 'sari'

export interface IconFC extends FC<IconProps> {
  loadFont: typeof loadFont
  parseGlyphs: typeof parseGlyphs
}

export const Icon: IconFC = (props) => {
  const {
    className,
    style,

    name = '',
    family = internalFamily,
    prefix,
    size,
    color,
    imageMode = 'aspectFill',
    imageClass,
    _element,
    ...restProps
  } = props

  const [bem] = useBem('icon')

  const isImg = useMemo(() => {
    // number表示react-native import导入的图片的对象的引入下标
    return isNumber(name) || isFileUrl(String(name))
  }, [name])

  const char = useFonts(family, name)

  let mergedPrefix = prefix
  if (family === internalFamily) {
    mergedPrefix = internalPrefix
  }

  const RootElement = _element ?? Text

  return (
    <RootElement
      {...restProps}
      className={classNames(
        bem.b(),
        {
          [`${mergedPrefix || family}-${name}`]: !isRN && name && !isImg,
        },
        className,
      )}
      style={{
        ...style,
        fontFamily: family,
        ...filterNullish({
          fontSize: size,
          lineHeight: size ? addPxInWeb(size * 1.25) : size,
          color,
        }),
      }}
    >
      {isImg ? (
        <Image
          className={classNames(bem.e('image'), imageClass)}
          src={name}
          mode={imageMode}
          style={filterNullish({
            width: size,
            height: size,
          })}
        />
      ) : (
        char
      )}
    </RootElement>
  )
}

Icon.loadFont = loadFont
Icon.parseGlyphs = parseGlyphs

export default Icon
