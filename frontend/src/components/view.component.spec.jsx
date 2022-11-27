import renderer from 'react-test-renderer';
import { View } from './view.component';

describe('View', () => {
  it('should render a View component', () => {
    const renderedComponent = renderer.create(<View>Hello World!</View>).toJSON()

    expect(renderedComponent).toMatchSnapshot()
  })

  describe('when hasBorderTop is true', () => {
    it('should render a View component with a top border', () => {
      const renderedComponent = renderer.create(<View hasBorderTop>Hello World!</View>).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })

  describe('when hasBorderLeft is true', () => {
    it('should render a View component with a left border', () => {
      const renderedComponent = renderer.create(<View hasBorderLeft>Hello World!</View>).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })

  describe('when hasBorderRight is true', () => {
    it('should render a View component with a right border', () => {
      const renderedComponent = renderer.create(<View hasBorderRight>Hello World!</View>).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })

  describe('when hasBorderBottom is true', () => {
    it('should render a View component with a bottom border', () => {
      const renderedComponent = renderer.create(<View hasBorderBottom>Hello World!</View>).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })
})