import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { getRegionData } from 'region-data'

import Tree from '../tree.vue'

const regionData = getRegionData()

const treeData = regionData.slice(0, 5).map((item) => ({
  ...item,
  children: item.children.slice(0, 3).map((item) => ({
    ...item,
    children: item.children.slice(0, 3),
  })),
}))

const nodeKeys = { title: 'name', key: 'code' }

describe('Tree', () => {
  // ── defaultExpandAll ─────────────────────────────────────────────

  test('defaultExpandAll expands all nodes', async () => {
    const wrapper = mount(<Tree data={treeData} nodeKeys={nodeKeys} defaultExpandAll={true} />)

    await nextTick()

    const arrows = wrapper.findAll('.s-tree__arrow')
    expect(arrows.length).toBeGreaterThan(0)
    expect(arrows.every((item) => item.classes().includes('s-tree__arrow--expanded'))).toBe(true)
  })

  // ── defaultExpandedAndChecked ────────────────────────────────────

  test('defaultExpandedKeys and defaultCheckedKeys', () => {
    const wrapper = mount(
      <Tree
        data={treeData}
        nodeKeys={nodeKeys}
        selectable={true}
        defaultCheckedKeys={[110101, 120100]}
        defaultExpandedKeys={[110100, 120100]}
      />,
    )

    expect(wrapper.getComponent(Tree).vm.getCheckedKeys()).toEqual([
      110101, 120000, 120100, 120101, 120102, 120103,
    ])

    expect(wrapper.getComponent(Tree).vm.getExpandedKeys()).toEqual([
      110000, 110100, 120000, 120100,
    ])
  })

  // ── accordion ────────────────────────────────────────────────────

  test('accordion mode keeps only one branch expanded', async () => {
    const wrapper = mount(<Tree data={treeData} nodeKeys={nodeKeys} accordion={true} />)

    await wrapper
      .findAll('.s-tree__node')
      .find((item) => item.text() === '北京市')
      ?.trigger('click')
    expect(wrapper.getComponent(Tree).vm.getExpandedKeys()).toEqual([110000])

    await wrapper
      .findAll('.s-tree__node')
      .find((item) => item.text() === '天津市')
      ?.trigger('click')

    expect(wrapper.getComponent(Tree).vm.getExpandedKeys()).toEqual([120000])
  })

  // ── selectable ───────────────────────────────────────────────────

  test('selectable with check cascade', () => {
    const wrapper = mount(<Tree data={treeData} nodeKeys={nodeKeys} selectable={true} />)

    wrapper.getComponent(Tree).vm.setChecked(110000, true)
    expect(wrapper.getComponent(Tree).vm.getCheckedKeys()).toEqual([
      110000, 110100, 110101, 110102, 110105,
    ])

    wrapper.getComponent(Tree).vm.setChecked(110000, false)
    wrapper.getComponent(Tree).vm.setChecked(120101, true)
    expect(wrapper.getComponent(Tree).vm.getCheckedKeys()).toEqual([120101])
    expect(wrapper.getComponent(Tree).vm.getHalfCheckedKeys()).toEqual([120000, 120100])
  })

  test('checkStrictly does not cascade', () => {
    const wrapper = mount(
      <Tree data={treeData} nodeKeys={nodeKeys} selectable={true} checkStrictly={true} />,
    )

    wrapper.getComponent(Tree).vm.setChecked(110000, true)
    expect(wrapper.getComponent(Tree).vm.getCheckedKeys()).toEqual([110000])
  })

  // ── filter ───────────────────────────────────────────────────────

  test('filters nodes in lenient mode', async () => {
    const wrapper = mount(<Tree data={treeData} nodeKeys={nodeKeys} />)

    wrapper.getComponent(Tree).vm.filter('北京市')
    await nextTick()
    expect(wrapper.findAll('.s-tree__title').map((item) => item.text())).toEqual(['北京市'])

    await wrapper.find('.s-tree__node')?.trigger('click')
    expect(wrapper.findAll('.s-tree__title').map((item) => item.text())).toEqual([
      '北京市',
      '北京市',
    ])

    const nodes = wrapper.findAll('.s-tree__node')
    await nodes[nodes.length - 1]?.trigger('click')
    expect(wrapper.findAll('.s-tree__title').map((item) => item.text())).toEqual([
      '北京市',
      '北京市',
      '东城区',
      '西城区',
      '朝阳区',
    ])
  })

  test('filters nodes in strict mode', async () => {
    const wrapper = mount(<Tree data={treeData} nodeKeys={nodeKeys} filterMode="strict" />)

    wrapper.getComponent(Tree).vm.filter('北京市')
    await nextTick()
    expect(wrapper.findAll('.s-tree__title').map((item) => item.text())).toEqual([
      '北京市',
      '北京市',
    ])

    const nodes = wrapper.findAll('.s-tree__node')
    await nodes[nodes.length - 1]?.trigger('click')
    expect(wrapper.findAll('.s-tree__title').map((item) => item.text())).toEqual([
      '北京市',
      '北京市',
    ])
  })

  // ── single selectable ────────────────────────────────────────────

  test('singleSelectable with leafOnly and current', async () => {
    const wrapper = mount(
      <Tree
        data={treeData}
        nodeKeys={nodeKeys}
        singleSelectable={true}
        leafOnly={true}
        current={110102}
        defaultExpandAll={true}
      />,
    )

    await nextTick()

    const currentTitle = wrapper.find('.s-tree__node--current .s-tree__title')
    expect(currentTitle.text()).toBe('西城区')

    const allNodes = wrapper.findAll('.s-tree__node')
    await allNodes[7]?.trigger('click')

    const newCurrentTitle = wrapper.find('.s-tree__node--current .s-tree__title')
    expect(newCurrentTitle.text()).toBe('和平区')
  })

  // ── basic rendering ──────────────────────────────────────────────

  test('renders tree with data', () => {
    const wrapper = mount(<Tree data={treeData} nodeKeys={nodeKeys} />)

    expect(wrapper.find('.s-tree').exists()).toBe(true)
  })

  test('renders without data', () => {
    const wrapper = mount(<Tree />)

    expect(wrapper.find('.s-tree').exists()).toBe(true)
  })
})
