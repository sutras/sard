import { ReactNode, useState } from 'react'
import { Cell, CheckContext, Radio, useCheck, useCheckGroup } from 'sard-taro'

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
      icon={<Radio checked={isChecked} />}
      clickable
      title={children}
      onClick={toggle}
    />
  )
}

export default () => {
  const [value, setValue] = useState<string[]>(['apple'])

  return (
    <CustomRadioGroup value={value} onChange={setValue}>
      <CustomRadio value="apple">苹果</CustomRadio>
      <CustomRadio value="banana">香蕉</CustomRadio>
      <CustomRadio value="peach">桃子</CustomRadio>
    </CustomRadioGroup>
  )
}
