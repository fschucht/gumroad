import './text.component.css'

export const Text = ({ isBold, children }) => {
  return (
    <p className='text'>{children}</p>
  )
}