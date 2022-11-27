import renderer from 'react-test-renderer';
import { Review } from './review.component';

describe('Review', () => {
  it('should render a Review component', () => {
    const renderedComponent = renderer
      .create(
        <Review review={{
          rating: 5,
          comment: 'Comment',
          user: {
            email: 'email'
          }
        }}>Hello World!</Review>
      )
      .toJSON()

    expect(renderedComponent).toMatchSnapshot()
  })
})