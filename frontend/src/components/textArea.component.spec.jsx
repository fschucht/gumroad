import renderer from 'react-test-renderer';
import { TextArea } from './textArea.component';

describe('TextArea', () => {
  it('should render a TextArea component', () => {
    const renderedComponent = renderer.create(<TextArea value='Test' placeholder='Test' />).toJSON()

    expect(renderedComponent).toMatchSnapshot()
  })
})