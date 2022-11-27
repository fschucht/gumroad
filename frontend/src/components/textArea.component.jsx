import './textArea.component.css'

export const TextArea = ({ value, placeholder, onChange }) => {
  return (
    <textarea
      className='textarea'
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  )
}