import renderer from 'react-test-renderer';
import { Container } from './container.component';

describe('Container', () => {
  it('should render a Container component', () => {
    const renderedComponent = renderer.create(<Container>Hello World!</Container>).toJSON()

    expect(renderedComponent).toMatchSnapshot()
  })
})