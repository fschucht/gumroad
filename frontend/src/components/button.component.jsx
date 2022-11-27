import mergeClassNames from 'classnames'
import './button.component.css'

export const Button = ({ type, url, onClick, isDisabled = false, children }) => {
  const classNames = mergeClassNames({
    'button': true,
    'button--primary': type === 'primary',
    'button--secondary': type === 'secondary'
  })

  if (url) {
    return (
      <a
        className={classNames}
        href={url}
      >
        {children}
      </a>
    )
  }

  if (onClick) {
    return (
      <button
        className={classNames}
        onClick={onClick}
        disabled={isDisabled}
      >
        {children}
      </button>
    )
  }

  return null
}