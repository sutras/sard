import { CSSProperties, FC, ReactNode } from 'react'
import classNames from 'classnames'
import { Icon } from '../icon'

export interface ResultProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  status?: 'success' | 'info' | 'warning' | 'error' | 'question'
  icon?: ReactNode
  title?: ReactNode
  description?: ReactNode
}

const mapStatusIcon = {
  success: 'check-circle-fill',
  info: 'info-circle-fill',
  warning: 'warning-fill',
  error: 'x-octagon-fill',
  question: 'question-circle-fill',
}

export const Result: FC<ResultProps> = (props) => {
  const {
    className,
    children,
    status = 'info',
    icon,
    title,
    description,
    ...restProps
  } = props

  const resultClass = classNames('s-result', `s-result-${status}`, className)

  return (
    <div {...restProps} className={resultClass}>
      <div className="s-result-icon">
        {icon ?? <Icon prefix="si" name={mapStatusIcon[status]}></Icon>}
      </div>
      {title && <div className="s-result-title">{title}</div>}
      {description && <div className="s-result-description">{description}</div>}
      {children && <div className="s-result-extra">{children}</div>}
    </div>
  )
}

export default Result
