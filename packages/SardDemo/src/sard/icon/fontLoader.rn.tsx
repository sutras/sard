import { isLoading, loadAsync } from 'expo-font'
import {
  Glyph,
  MapFontFamilyGlyphs,
  MapNameUnicode,
  internalFamily,
} from './common'
import iconfont from './font/iconfont.json'
import { useForceRender } from '../use'
import { useRef } from 'react'

const mapFamilyGlyph: { [key: string]: MapNameUnicode } = {}

export function parseGlyphs(glyphs: { glyphs: Glyph[] }) {
  const map: MapNameUnicode = {}
  glyphs.glyphs.forEach((item) => {
    map[item.font_class] = item.unicode_decimal
  })
  return map
}

const loadPromises: Record<string, Promise<void>> = {}

export function loadFont(mapFamily: MapFontFamilyGlyphs) {
  return Promise.all(
    Object.keys(mapFamily).map((family) => {
      return new Promise((resolve, reject) => {
        const { glyphs, font } = mapFamily[family]

        loadPromises[family] = loadAsync({
          [family]: font,
        })
          .then(resolve)
          .catch(reject)

        mapFamilyGlyph[family] = glyphs
      })
    }),
  )
}

function loadInternalFont() {
  loadFont({
    [internalFamily]: {
      glyphs: parseGlyphs(iconfont),
      font: require('./font/iconfont.ttf'),
    },
  })
}

loadInternalFont()

export function useFonts(family: string, name = '') {
  const forceRender = useForceRender()

  const isListening = useRef(false)

  if (isLoading(family) && !isListening.current) {
    isListening.current = true
    loadPromises[family].then(() => {
      forceRender()
    })

    return ''
  }

  const unicode = mapFamilyGlyph[family]?.[name]

  if (!unicode) {
    return ''
  }

  return String.fromCharCode(unicode)
}
