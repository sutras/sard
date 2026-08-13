import { computed, type Ref, ref } from 'vue'
import { type CascaderPanel, type CascaderProps, type CascaderStateNode } from './common'
import { useTranslateWithPrefix } from '../../locale'

export function useCascaderTabs(
  props: CascaderProps,
  config: {
    treeData: Ref<CascaderStateNode[]>
  },
) {
  const { treeData } = config

  const currentTab = ref(0)

  const panels = computed(() => {
    let currentPanels: CascaderPanel = {
      nodes: treeData.value,
      selected: null,
    }

    const panels: CascaderPanel[] = [currentPanels]

    while (currentPanels) {
      const node: CascaderStateNode | undefined = currentPanels.nodes.find((node) => node.selected)

      if (node) {
        currentPanels.selected = node
      }

      if (node && node.children && node.children.length) {
        panels.push(
          (currentPanels = {
            nodes: node.children,
            selected: null,
          }),
        )
      } else {
        break
      }
    }

    return panels
  })

  const { t } = useTranslateWithPrefix('cascader')

  const innerPaceholder = computed(() => {
    return props.hintText || t('pleaseSelect')
  })

  const tabsOptions = computed(() => {
    return panels.value.map((panel, index) => {
      const { selected } = panel
      const label = selected ? selected.label : innerPaceholder.value
      return {
        label,
        value: index,
      }
    })
  })

  return {
    panels,
    currentTab,
    tabsOptions,
  }
}
