import { ReactNode, useState } from 'react'
import { Cell, CheckContext, Icon, useCheck, useCheckGroup } from 'sard-taro'

interface CustomCheckGroupProps {
  value?: any[]
  defaultValue?: any[]
  onChange?: (value: any[]) => void
  children?: ReactNode
}

const CustomCheckboxGroup = (props: CustomCheckGroupProps) => {
  const { value, defaultValue, onChange, children } = props

  const context = useCheckGroup({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () => [],
  })

  return (
    <CheckContext.Provider value={context}>
      <Cell.Group card>{children}</Cell.Group>
    </CheckContext.Provider>
  )
}

interface CustomCheckProps {
  checked?: boolean
  defaultChecked?: boolean
  value?: any
  onChange?: (checked: boolean, value: any) => void
  children?: ReactNode
}

const CustomCheckbox = (props: CustomCheckProps) => {
  const { checked, defaultChecked, children, value, onChange } = props

  const [isChecked, toggle] = useCheck(
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
    <Cell
      clickable
      title={children}
      onClick={toggle}
      value={isChecked && <Icon color="var(--sar-primary)" name="success" />}
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
