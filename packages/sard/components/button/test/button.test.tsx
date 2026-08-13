import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Button from '../button.vue'
import Loading from '../../loading/loading.vue'

describe('Button', () => {
  test('create', async () => {
    const wrapper = mount(<Button>默认</Button>)

    expect(wrapper.find('.s-button').text()).toBe('默认')
    expect(wrapper.find('.s-button').classes()).toEqual(
      expect.arrayContaining([
        's-button',
        's-button--medium',
        's-button--solid',
        's-button--solid-primary',
      ]),
    )
    expect(wrapper.find('.s-button').attributes('type')).toBe('button')
    expect(wrapper.find('.s-button').attributes('disabled')).toBeUndefined()
  })

  test('variant and color', async () => {
    const wrapper = mount(
      <Button variant="filled" color="success">
        默认
      </Button>,
    )

    expect(wrapper.find('.s-button').classes()).toEqual(
      expect.arrayContaining(['s-button--filled', 's-button--filled-success']),
    )
  })

  test('size and shape modifiers', async () => {
    const wrapper = mount(
      <Button size="large" round square>
        默认
      </Button>,
    )

    expect(wrapper.find('.s-button').classes()).toEqual(
      expect.arrayContaining(['s-button--large', 's-button--round', 's-button--square']),
    )
  })

  test('state modifiers', async () => {
    const wrapper = mount(
      <Button block ghost autoHeight compact>
        默认
      </Button>,
    )

    expect(wrapper.find('.s-button').classes()).toEqual(
      expect.arrayContaining([
        's-button--block',
        's-button--ghost',
        's-button--auto-height',
        's-button--compact',
      ]),
    )
  })

  test('disabled state', async () => {
    const wrapper = mount(<Button disabled>默认</Button>)

    expect(wrapper.find('.s-button').classes()).toContain('is-disabled')
    expect(wrapper.find('.s-button').attributes('disabled')).toBeDefined()
  })

  test('loading state renders loading component and disables the button', async () => {
    const wrapper = mount(<Button loading>默认</Button>)

    expect(wrapper.find('.s-button').classes()).toEqual(
      expect.arrayContaining(['is-loading', 's-button--iconic']),
    )
    expect(wrapper.findComponent(Loading).exists()).toBe(true)
    expect(wrapper.find('.s-button__icon').classes()).toContain('has-slot')
    expect(wrapper.find('.s-button').attributes('disabled')).toBeDefined()
  })

  test('icon slot toggles with loading', async () => {
    const wrapper = mount(
      <Button
        v-slots={{
          icon: () => <span class="custom-icon">+</span>,
        }}
      >
        默认
      </Button>,
    )

    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.findComponent(Loading).exists()).toBe(false)
    expect(wrapper.find('.s-button').classes()).toContain('s-button--iconic')

    await wrapper.setProps({ loading: true })

    expect(wrapper.find('.custom-icon').exists()).toBe(false)
    expect(wrapper.findComponent(Loading).exists()).toBe(true)
  })

  test('click emit', async () => {
    const wrapper = mount(<Button>默认</Button>)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.emitted('click')?.[0]?.[0]).toBeInstanceOf(MouseEvent)
  })
})
