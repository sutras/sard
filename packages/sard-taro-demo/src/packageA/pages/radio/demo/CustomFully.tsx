import { ReactNode, useState } from 'react'
import { Cell, CheckContext, Icon, useCheck, useCheckGroup } from 'sard-taro'

interface CustomCheckGroupProps {
  value?: any
  defaultValue?: any
  onChange?: (value: any) => void
  children?: ReactNode
}

const CustomRadioGroup = (props: CustomCheckGroupProps) => {
  const { value, defaultValue, onChange, children } = props

  const context = useCheckGroup({
    value,
    defaultValue,
    trigger: onChange,
    initialValue: () => undefined,
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

const CustomRadio = (props: CustomCheckProps) => {
  const { checked, defaultChecked, children, value, onChange } = props

  const [isChecked, toggle] = useCheck(
    'single',
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
  const [value, setValue] = useState('option2')

  return (
    <CustomRadioGroup value={value} onChange={setValue}>
      <CustomRadio value="option1">选项1</CustomRadio>
      <CustomRadio value="option2">选项2</CustomRadio>
      <CustomRadio value="option3">选项3</CustomRadio>
    </CustomRadioGroup>
  )
}
