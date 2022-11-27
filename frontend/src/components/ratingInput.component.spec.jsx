import renderer from 'react-test-renderer';
import { RatingInput } from './ratingInput.component';

describe('RatingInput', () => {
  it('should render a RatingInput component', () => {
    const renderedComponent = renderer.create(<RatingInput currentRating={0}>Hello World!</RatingInput>).toJSON()

    expect(renderedComponent).toMatchSnapshot()
  })
})