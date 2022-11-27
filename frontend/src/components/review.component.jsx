import { View } from './view.component'
import { Rating } from './rating.component'
import { Text } from './text.component'

export const Review = ({ review }) => {
  return (
    <>
      <View layout='row-space-between-center'>
        <Text>{review.user.email}</Text>
        <Rating averageRating={review.rating} shouldRenderRating={false} />
      </View>
      <View hasBorderBottom>
        <Text>{review.comment}</Text>
      </View>
    </>
  )
}