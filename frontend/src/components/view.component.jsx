import mergeClassNames from 'classnames'
import './view.component.css'

export const View = ({
  hasBorderTop = false,
  hasBorderLeft = false,
  hasBorderRight = false,
  hasBorderBottom = false,
  children
}) => {
  return <div
    className={mergeClassNames({
      'view': true,
      'view--with-border-top': hasBorderTop,
      'view--with-border-left': hasBorderLeft,
      'view--with-border-right': hasBorderRight,
      'view--with-border-bottom': hasBorderBottom,
    })}
  >
    {children}
  </div>
}