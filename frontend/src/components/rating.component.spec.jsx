import renderer from 'react-test-renderer';
import { Rating } from './rating.component';

describe('Rating', () => {
  function testRating(averageRating) {
    describe(`when the averageRating is ${averageRating}`, () => {
      it(`should render ${Math.ceil(averageRating)} stars`, () => {
        const renderedComponent = renderer.create(
          <Rating
            averageRating={averageRating}
            ratingsCount={100}
          >
            Hello World!
          </Rating>
        ).toJSON()

        expect(renderedComponent).toMatchSnapshot()
      })
    })
  }

  testRating(0)
  testRating(0.25)
  testRating(0.5)
  testRating(0.75)
  testRating(1)
  testRating(1.25)
  testRating(1.5)
  testRating(1.75)
  testRating(2)
  testRating(2.25)
  testRating(2.5)
  testRating(2.75)
  testRating(3)
  testRating(3.25)
  testRating(3.5)
  testRating(3.75)
  testRating(4)
  testRating(4.25)
  testRating(4.5)
  testRating(4.75)
  testRating(5)
})