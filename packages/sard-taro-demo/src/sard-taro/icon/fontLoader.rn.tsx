import { isLoaded, loadAsync } from 'expo-font'
import {
  Glyph,
  MapFontFamilyGlyphs,
  MapNameUnicode,
  internalFamily,
} from './common'
import iconfont from './font/iconfont.json'

const mapFamilyGlyph: { [key: string]: MapNameUnicode } = {}

export function parseGlyphs(glyphs: { glyphs: Glyph[] }) {
  const map: MapNameUnicode = {}
  glyphs.glyphs.forEach((item) => {
    map[item.font_class] = item.unicode_decimal
  })
  return map
}

export function loadFont(mapFamily: MapFontFamilyGlyphs) {
  Object.keys(mapFamily).forEach((family) => {
    const { glyphs, font } = mapFamily[family]

    loadAsync({
      [family]: font,
    })

    mapFamilyGlyph[family] = glyphs
  })
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
  if (!isLoaded(family)) {
    return ''
  }

  const unicode = mapFamilyGlyph[family]?.[name]

  if (!unicode) {
    return ''
  }

  return String.fromCharCode(unicode)
}
