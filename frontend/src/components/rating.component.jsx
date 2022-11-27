import mergeClassNames from 'classnames'
import { ReactComponent as StarSvg } from '../icons/star.svg'
import './rating.component.css'
import { Text } from './text.component'

export const Rating = ({ averageRating, ratingsCount, shouldRenderRating = true }) => {
  const roundedRating = Math.ceil(averageRating)

  return (
    <div className="rating">
      {new Array(5).fill(undefined).map((_value, index) => (
        <StarSvg
          key={index}
          className={
            mergeClassNames({
              'rating__star': true,
              'rating__star--active': roundedRating >= index + 1,
              'rating__star--last': index === 4
            })
          }
        />
      ))}
      {shouldRenderRating && (
        <Text>
          {averageRating.toFixed(1)}
          {typeof ratingsCount === 'number' && (
            <>{' '}({ratingsCount} Ratings)</>
          )}
        </Text>
      )}
    </div>
  )
}