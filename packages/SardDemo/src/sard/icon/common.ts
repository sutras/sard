export interface MapNameUnicode {
  [key: string]: number
}

export interface Glyph {
  font_class: string
  unicode_decimal: number
}

export interface MapFontFamilyGlyphs {
  [key: string]: {
    glyphs: MapNameUnicode
    font: ReturnType<NodeRequire>
  }
}

export const internalFamily = 'sard-icons'
