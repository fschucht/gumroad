import renderer from 'react-test-renderer';
import { Form } from './form.component';

describe('Form', () => {
  it('should render a Form component', () => {
    const renderedComponent = renderer.create(<Form>Hello World!</Form>).toJSON()

    expect(renderedComponent).toMatchSnapshot()
  })
})