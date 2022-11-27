import mergeClassNames from 'classnames'
import { useState } from 'react'
import { ReactComponent as StarSvg } from '../icons/star.svg'
import './ratingInput.component.css'
import { Text } from './text.component'

export const RatingInput = ({ currentRating, onChange }) => {
  const [selectedRating, setSelectedRating] = useState(currentRating)

  return (
    <div className="rating-input">
      <Text>Your Rating</Text>
      <div className='rating-input__stars'>
        {new Array(5).fill(undefined).map((_value, index) => (
          <StarSvg
            key={index}
            className={
              mergeClassNames({
                'rating-input__star': true,
                'rating-input__star--active': selectedRating >= index + 1,
              })
            }
            onMouseEnter={() => setSelectedRating(index + 1)}
            onMouseLeave={() => setSelectedRating(currentRating)}
            onClick={() => onChange(index + 1)}
          />
        ))}
      </div>
    </div>
  )
}