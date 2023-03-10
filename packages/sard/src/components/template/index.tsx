import { CSSProperties, FC, ReactNode } from 'react'

export interface TemplateProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export const Template: FC<TemplateProps> = (props) => {
  const { ...restProps } = props

  return <div {...restProps}></div>
}

export default Template
