import { API_TOKEN_KEY } from '../constants'
import { Button } from './button.component'
import { Text } from './text.component'
import { View } from './view.component'
import { Form } from './form.component'
import { useState } from 'react'
import { TextArea } from './textArea.component'
import { RatingInput } from './ratingInput.component'
import { toApiUrl } from '../hooks/useFetch.hook'

export const ReviewForm = ({ productId, hasReviewed, onRefetchProductReviews }) => {
  const apiToken = window.localStorage.getItem(API_TOKEN_KEY)

  const [reviewInput, setReviewInput] = useState({
    rating: 0,
    comment: ''
  })
  const [reviewError, setReviewError] = useState(null)

  const isValidComment = !reviewInput.comment || reviewInput.comment.length < 100

  const onSubmitReview = async (event) => {
    event.preventDefault()

    setReviewError(null)

    if (isValidComment) {
      setReviewError('Comment should be at least 100 characters long')
      return
    }

    const response = await fetch(toApiUrl(`/products/${productId}/product_reviews`), {
      method: 'POST',
      body: JSON.stringify(reviewInput),
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    })
    const responseBody = await response.json()

    if (response.status !== 201) {
      setReviewError(responseBody.errors[0])
      return
    }

    onRefetchProductReviews()
  }

  if (hasReviewed) {
    return null
  }

  if (!apiToken) {
    return (
      <View layout='row-space-between-center'>
        <Text>Login in to review this product.</Text>
        <Button type='secondary' url='/login'>Login</Button>
      </View >
    )
  }

  return (
    <>
      {reviewError && (
        <View>
          <Text>{reviewError}</Text>
        </View>
      )}
      <View>
        <Form>
          <RatingInput
            currentRating={reviewInput.rating}
            onChange={(rating) => setReviewInput({ ...reviewInput, rating })}
          />
          <TextArea
            value={reviewInput.comment}
            placeholder='Your Comment'
            onChange={(event) => setReviewInput({ ...reviewInput, comment: event.target.value })}
          />
        </Form>
        <Button
          type='primary'
          onClick={onSubmitReview}
          isDisabled={isValidComment}
        >
          Submit Review
        </Button>
      </View>
    </>
  )
}