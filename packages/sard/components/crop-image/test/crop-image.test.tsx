import { describe, expect, test } from 'vitest'

import { sleep } from '../../../utils'
import { cropImage } from '../imperative'

describe('CropImage', () => {
  test('visible', async () => {
    cropImage({
      url: 'http://temp/1.jpg',
    })

    await sleep(0)

    expect(document.querySelector('.s-crop-image')).toBeTruthy()
    expect(document.querySelector('.s-crop-image__cancel')).toBeTruthy()
    expect(document.querySelector('.s-crop-image__confirm')).toBeTruthy()

    cropImage.hide()
  })

  test('confirm', async () => {
    cropImage({
      url: 'http://temp/1.jpg',
      fail() {},
    })

    await sleep(0)

    expect(document.querySelector('.s-crop-image__confirm')).toBeTruthy()

    cropImage.hide()
  })
})
