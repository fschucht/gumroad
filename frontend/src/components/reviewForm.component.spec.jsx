import renderer from 'react-test-renderer';
import { ReviewForm } from './reviewForm.component';

describe('ReviewForm', () => {
  beforeEach(() => jest.resetAllMocks())

  describe('when the user has already reviewed', () => {
    it('should return null', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(undefined)

      const renderedComponent = renderer.create(<ReviewForm hasReviewed />).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })

  describe('when the user has not reviewed', () => {
    it('should return null', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce('api-token')

      const renderedComponent = renderer.create(<ReviewForm hasReviewed={false} />).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })

  describe('when there is no api token in the localstorage', () => {
    it('should render a login message', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(undefined)

      const renderedComponent = renderer.create(<ReviewForm hasReviewed={false} />).toJSON()

      expect(renderedComponent).toMatchSnapshot()
    })
  })
})