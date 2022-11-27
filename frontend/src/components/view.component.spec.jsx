import renderer from 'react-test-renderer';
import { View } from './view.component';

describe('View', () => {
  it('should render a View component', () => {
    const renderedComponent = renderer.create(<View>Hello World!</View>).toJSON()

    expect(renderedComponent).toMatchSnapshot()
  })
})