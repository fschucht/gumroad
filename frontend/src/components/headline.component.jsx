import './headline.component.css'

export const Headline = ({ size, children }) => {
  if (size === 'large') {
    return <h1 className='headline headline--large'>{children}</h1>
  }

  return null
}