import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";
import { Button } from "../components/button.component"
import { Container } from "../components/container.component"
import { Headline } from "../components/headline.component"
import { Rating } from "../components/rating.component"
import { ReviewForm } from "../components/reviewForm.component"
import { View } from "../components/view.component"
import { useFetch } from "../hooks/useFetch.hook"
import { API_TOKEN_KEY } from "../constants";
import { Text } from "../components/text.component";
import { Review } from "../components/review.component";

const refetchProductReviewsTrigger = createTrigger();

export const ProductRoute = () => {
  const apiToken = window.localStorage.getItem(API_TOKEN_KEY)

  const refetchProductReviewsTriggerValue = useTrigger(refetchProductReviewsTrigger);

  const {
    loading: isUserLoading,
    data: userData
  } = apiToken
      // eslint-disable-next-line react-hooks/rules-of-hooks
      ? useFetch('/users/current_user', {
        headers: {
          'Authorization': `Bearer ${apiToken}`
        }
      })
      : { loading: false, data: null }
  const {
    loading: isProductLoading,
    error: productError,
    data: productData
  } = useFetch('/products/1')
  const {
    loading: isProductReviewsLoading,
    error: productReviewsError,
    data: productReviewsData
  } = useFetch('/products/1/product_reviews', {
    depends: [refetchProductReviewsTriggerValue]
  })

  const onLogout = () => {
    window.localStorage.removeItem(API_TOKEN_KEY)
    document.location.reload()
  }

  if (productError || productReviewsError) {
    return <Container>
      <View>
        <Text>An error occurred while loading this product.</Text>
      </View>
    </Container>
  }

  if (isUserLoading || isProductLoading || isProductReviewsLoading || !productData || !productReviewsData) {
    return <Container>
      <View>
        <Text>Loading</Text>
      </View>
    </Container>
  }

  return (
    <Container>
      <View layout='row-space-between-center' hasBorderBottom>
        <Headline size='large'>{productData.data.title}</Headline>
        <View>
          {userData ? (
            <Button type='secondary' onClick={onLogout}>Logout</Button>
          ) : (
            <>
              <Button type='primary' url='/register'>Register</Button>
              <Button type='secondary' url='/login'>Login</Button>
            </>
          )}
        </View>
      </View>
      <View hasBorderBottom>
        <Rating
          averageRating={productReviewsData.data.stats.average_rating} ratingsCount={productReviewsData.data.reviews.length}
        />
      </View>
      {productReviewsData.data.reviews.map(review => <Review review={review} />)}
      <ReviewForm
        productId={productData.data.id}
        hasReviewed={userData && productReviewsData.data.reviews.some(({ user_id }) => user_id === userData.data.id)}
        onRefetchProductReviews={refetchProductReviewsTrigger}
      />
    </Container>
  )
}