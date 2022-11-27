import mergeClassNames from 'classnames'
import './button.component.css'

export const Button = ({ type, url, children }) => {
  return (
    <a
      className={mergeClassNames({
        'button': true,
        'button--primary': type === 'primary',
        'button--secondary': type === 'secondary'
      })}
      href={url}
    >
      {children}
    </a>
  )
}