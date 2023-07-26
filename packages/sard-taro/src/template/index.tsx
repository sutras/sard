import { FC } from 'react'
import { BaseProps } from '../base'

export type TemplateProps = BaseProps

export const Template: FC<TemplateProps> = (props) => {
  const { ...restProps } = props

  return <div {...restProps}></div>
}

export default Template
