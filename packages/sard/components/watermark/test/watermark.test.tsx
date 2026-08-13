import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Watermark from '../watermark.vue'

describe('Watermark', () => {
  test('basic', async () => {
    const wrapper = mount(<Watermark content="Sard"></Watermark>)

    expect(wrapper.find('.s-watermark').exists()).toBeTruthy()
  })
})
