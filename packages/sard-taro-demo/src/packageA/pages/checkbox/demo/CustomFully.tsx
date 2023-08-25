import { ReactNode, useState } from 'react'
import {
  Cell,
  CheckContext,
  Checkbox,
  useCheck,
  useCheckGroup,
} from 'sard-taro'

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
      icon={<Checkbox checked={isChecked} />}
      clickable
      title={children}
      onClick={toggle}
    />
  )
}

export default () => {
  const [value, setValue] = useState<string[]>(['apple'])

  return (
    <CustomCheckboxGroup value={value} onChange={setValue}>
      <CustomCheckbox value="apple">苹果</CustomCheckbox>
      <CustomCheckbox value="banana">香蕉</CustomCheckbox>
      <CustomCheckbox value="peach">桃子</CustomCheckbox>
    </CustomCheckboxGroup>
  )
}
