import mergeClassNames from 'classnames'
import './view.component.css'

export const View = ({
  layout,
  hasBorderTop = false,
  hasBorderLeft = false,
  hasBorderRight = false,
  hasBorderBottom = false,
  children
}) => {
  return <div
    className={mergeClassNames({
      'view': true,
      'view--layout-row-space-between-center': layout === 'row-space-between-center',
      'view--with-border-top': hasBorderTop,
      'view--with-border-left': hasBorderLeft,
      'view--with-border-right': hasBorderRight,
      'view--with-border-bottom': hasBorderBottom,
    })}
  >
    {children}
  </div>
}