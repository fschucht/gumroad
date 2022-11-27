import renderer from 'react-test-renderer';
import { Headline } from './headline.component';

describe('Headline', () => {
  describe('when size is large', () => {
    it('should render a Headline component', () => {
      const renderedComponent = renderer.create(<Headline size='large'>Hello World!</Headline>).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })

  describe('when size is missing', () => {
    it('should return null', () => {
      const renderedComponent = renderer.create(<Headline>Hello World!</Headline>).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })
})