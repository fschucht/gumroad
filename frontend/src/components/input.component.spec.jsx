import renderer from 'react-test-renderer';
import { Input } from './input.component';

describe('Input', () => {
  it('should render a Input component', () => {
    const renderedComponent = renderer.create(<Input type='text' value='Test' placeholder='Test' />).toJSON()

    expect(renderedComponent).toMatchSnapshot()
  })
})