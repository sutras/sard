import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import Grid from '../grid.vue'
import GridItem from '../grid-item.vue'

const renderGridItems = (count = 8) =>
  Array.from({ length: count }, (_, index) => <GridItem key={index} text={`文字${index + 1}`} />)

describe('Grid', () => {
  test('renders grid items', async () => {
    const wrapper = mount(<Grid>{renderGridItems()}</Grid>)

    expect(wrapper.findAll('.s-grid__item')).toHaveLength(8)
    expect(wrapper.find('.s-grid__text').text()).toBe('文字1')
  })

  test('columns update grid template columns style', async () => {
    const wrapper = mount(<Grid columns={3}>{renderGridItems(6)}</Grid>)

    expect(wrapper.attributes('style')).toContain(
      'grid-template-columns: repeat(3, minmax(0,1fr));',
    )
  })

  test('square modifier is applied', async () => {
    const wrapper = mount(
      <Grid columns={3} square>
        {renderGridItems(6)}
      </Grid>,
    )

    expect(wrapper.classes()).toContain('s-grid--square')
  })

  test('gap is applied on the grid container', async () => {
    const wrapper = mount(
      <Grid columns={4} gap={20}>
        {renderGridItems()}
      </Grid>,
    )

    expect(wrapper.attributes('style')).toContain('gap: 20px;')
  })

  test('bordered modifier applies when there is no gap', async () => {
    const wrapper = mount(<Grid bordered>{renderGridItems()}</Grid>)

    expect(wrapper.classes()).toContain('s-grid--bordered')
    expect(wrapper.classes()).not.toContain('s-grid--surround')
  })

  test('surround modifier applies when bordered grid also has gap', async () => {
    const wrapper = mount(
      <Grid bordered gap={20}>
        {renderGridItems()}
      </Grid>,
    )

    expect(wrapper.classes()).toContain('s-grid--surround')
    expect(wrapper.classes()).not.toContain('s-grid--bordered')
  })

  test('direction modifier is applied', async () => {
    const wrapper = mount(<Grid direction="horizontal">{renderGridItems()}</Grid>)

    expect(wrapper.classes()).toContain('s-grid--horizontal')
  })

  test('reverse modifier is applied', async () => {
    const wrapper = mount(<Grid reverse>{renderGridItems()}</Grid>)

    expect(wrapper.classes()).toContain('s-grid--reverse')
  })

  test('clickable modifier is applied', async () => {
    const wrapper = mount(<Grid clickable>{renderGridItems()}</Grid>)

    expect(wrapper.classes()).toContain('s-grid--clickable')
  })

  test('content slot renders inside the grid item content container', async () => {
    const wrapper = mount(
      <Grid>
        {Array.from({ length: 8 }, (_, index) => (
          <GridItem
            key={index}
            v-slots={{
              content: () => 'content',
            }}
          />
        ))}
      </Grid>,
    )

    expect(wrapper.find('.s-grid__content').text()).toBe('content')
  })

  test('badge props are currently inert on grid items', async () => {
    const wrapper = mount(
      <Grid>
        <GridItem dot text="文字" />
        <GridItem badge={99} text="文字" />
        <GridItem badge={999} badgeProps={{ max: 120 }} text="文字" />
      </Grid>,
    )

    expect(wrapper.findAll('.s-grid__item')).toHaveLength(3)
    expect(wrapper.findAll('.s-badge')).toHaveLength(0)
    expect(wrapper.findAll('.s-grid__text').map((item) => item.text())).toEqual([
      '文字',
      '文字',
      '文字',
    ])
  })
})
