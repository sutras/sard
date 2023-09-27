import { ReactNode, useState } from 'react'
import { List, SelectContext, Icon, useSelect, useSelectGroup } from 'sard-taro'

interface CustomCheckboxGroupProps {
  value?: any[]
  defaultValue?: any[]
  onChange?: (value: any[]) => void
  children?: ReactNode
}

const CustomCheckboxGroup = (props: CustomCheckboxGroupProps) => {
  const { value, defaultValue, onChange, children } = props

  const context = useSelectGroup({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () => [],
  })

  return (
    <SelectContext.Provider value={context}>
      <List card>{children}</List>
    </SelectContext.Provider>
  )
}

interface CustomCheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  value?: any
  onChange?: (checked: boolean, value: any) => void
  children?: ReactNode
}

const CustomCheckbox = (props: CustomCheckboxProps) => {
  const { checked, defaultChecked, children, value, onChange } = props

  const [isChecked, toggle] = useSelect(
    'multiple',
    {
      value: checked,
      defaultValue: defaultChecked,
      trigger: onChange,
      initialValue: false,
    },
    value,
  )

  return (
    <List.Item
      clickable
      title={children}
      onClick={toggle}
      value={isChecked && <Icon color="tomato" name="success" />}
    />
  )
}

export default () => {
  const [value, setValue] = useState<string[]>(['option2'])

  return (
    <CustomCheckboxGroup value={value} onChange={setValue}>
      <CustomCheckbox value="option1">选项1</CustomCheckbox>
      <CustomCheckbox value="option2">选项2</CustomCheckbox>
      <CustomCheckbox value="option3">选项3</CustomCheckbox>
    </CustomCheckboxGroup>
  )
}
