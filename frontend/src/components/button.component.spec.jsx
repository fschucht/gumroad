import renderer from 'react-test-renderer';
import { Button } from './button.component';

describe('Button', () => {
  it('should render a Button component', () => {
    const renderedComponent = renderer.create(<Button>Hello World!</Button>).toJSON()

    expect(renderedComponent).toMatchSnapshot()
  })

  describe('when type is primary', () => {
    it('should render a primary Button component', () => {
      const renderedComponent = renderer.create(<Button type='primary'>Hello World!</Button>).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })

  describe('when type is secondary', () => {
    it('should render a secondary Button component', () => {
      const renderedComponent = renderer.create(<Button type='secondary'>Hello World!</Button>).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })
})