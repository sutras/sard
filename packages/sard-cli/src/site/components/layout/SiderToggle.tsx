import classNames from 'classnames'

export default function SidebarToggle({ show, ...restProps }) {
  const toggleClass = classNames('doc-layout-sider-toggle', {
    show,
  })
  return (
    <button type="button" {...restProps} className={toggleClass}>
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}
