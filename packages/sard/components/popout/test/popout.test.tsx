import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import Popout from '../popout.vue'

describe('Popout', () => {
  test('basic', async () => {
    const wrapper = mount(
      <Popout visible title="标题">
        <div class="content">内容</div>
      </Popout>,
      {
        attachTo: document.body,
      },
    )

    await nextTick()

    const root = Array.from(document.body.querySelectorAll('.s-popout')).at(
      -1,
    ) as HTMLElement | null

    expect(root?.querySelector('.s-popout__title')?.textContent).toContain('标题')
    expect(root?.querySelector('.content')?.textContent).toBe('内容')
    expect(root?.querySelector('.s-popout__header--compact')).not.toBeNull()

    wrapper.unmount()
  })

  test('compact', async () => {
    const wrapper = mount(<Popout visible title="标题" type="compact" />, {
      attachTo: document.body,
    })

    await nextTick()

    const root = Array.from(document.body.querySelectorAll('.s-popout')).at(
      -1,
    ) as HTMLElement | null

    expect(root?.querySelector('.s-popout__header--compact')).not.toBeNull()
    expect(root?.querySelectorAll('.s-popout__button-wrap')).toHaveLength(2)

    wrapper.unmount()
  })

  test('loose mode renders close button and footer actions', async () => {
    const wrapper = mount(<Popout visible title="标题" type="loose" showCancel />, {
      attachTo: document.body,
    })

    await nextTick()

    const root = Array.from(document.body.querySelectorAll('.s-popout')).at(
      -1,
    ) as HTMLElement | null

    expect(root?.querySelector('.s-popout__header--loose')).not.toBeNull()
    expect(root?.querySelector('.s-popout__close')).not.toBeNull()
    expect(root?.querySelector('.s-popout__footer')).not.toBeNull()
    expect(root?.textContent).toContain('取消')
    expect(root?.textContent).toContain('确定')

    wrapper.unmount()
  })
})
