import renderer from 'react-test-renderer';
import { Text } from './text.component';

describe('Text', () => {
  it('should render a Text component', () => {
    const renderedComponent = renderer.create(<Text>Hello World!</Text>).toJSON()

    expect(renderedComponent).toMatchSnapshot()
  })
})