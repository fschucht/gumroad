import './view.component.css'

export const View = ({ children }) => {
  console.log(children)
  return <div className="view">{children}</div>
}