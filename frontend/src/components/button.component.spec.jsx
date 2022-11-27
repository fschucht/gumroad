import renderer from 'react-test-renderer';
import { Button } from './button.component';

describe('Button', () => {
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

  describe('when url is provided', () => {
    it('should render a link Button component', () => {
      const renderedComponent = renderer.create(<Button type='primary' url='URL'>Hello World!</Button>).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })

  describe('when onClick is provided', () => {
    it('should render a button Button component', () => {
      const renderedComponent = renderer.create(<Button type='primary' onClick={() => ''}>Hello World!</Button>).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })

  describe('when neither url nor onClick is provided', () => {
    it('should return null', () => {
      const renderedComponent = renderer.create(<Button>Hello World!</Button>).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })
})