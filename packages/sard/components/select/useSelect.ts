import { provide, reactive, ref, toRef, toValue } from 'vue'
import { type SelectContext, type SelectMember, selectContextKey } from './common'

export function useSelect(
  props: {
    multiple: boolean
    multipleLimit: number
  },
  options: {
    onToggle?: (value: any) => void
    onSelect?: (value: any) => void
  } = {},
) {
  const innerValue = ref<any>(props.multiple ? [] : undefined)

  const { onToggle, onSelect } = options

  const members = reactive<SelectMember[]>([])

  const addMember = (member: SelectMember) => {
    if (!members.includes(member)) {
      members.push(member)
    }
  }

  const removeMember = (member: SelectMember) => {
    const index = members.indexOf(member)
    if (index !== -1) {
      members.splice(index, 1)
    }
  }

  const getEnabledValue = () => {
    return members.filter((member) => !toValue(member.disabled)).map((member) => member.value)
  }

  const toggle = (value: any) => {
    let nextValue: any

    if (props.multiple) {
      nextValue = innerValue.value.includes(value)
        ? innerValue.value.filter((val: any) => val !== value)
        : innerValue.value.concat(value)
    } else {
      if (value === innerValue.value) {
        onSelect?.(value)
        return
      }
      nextValue = value
    }

    onToggle?.(nextValue)
    onSelect?.(value)
  }

  const context: SelectContext = {
    innerValue,
    toggle,
    multiple: toRef(() => props.multiple),
    multipleLimit: toRef(() => props.multipleLimit),
    members,
    addMember,
    removeMember,
    getEnabledValue,
  }

  provide(selectContextKey, context)

  return context
}
