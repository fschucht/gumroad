import { Button } from "../components/button.component"
import { Container } from "../components/container.component"
import { Headline } from "../components/headline.component"
import { Rating } from "../components/rating.component"
import { View } from "../components/view.component"
import { useFetch } from "../hooks/useFetch.hook"

export const ProductRoute = () => {
  const {
    loading: isProductLoading,
    error: productError,
    data:
    productData
  } = useFetch('/products/1')
  const {
    loading: isProductReviewsLoading,
    error: productReviewsError,
    data:
    productReviewsData
  } = useFetch('/products/1/product_reviews')

  if (productError || productReviewsError) {
    return <Container>An error occurred while loading this product.</Container>
  }

  if (isProductLoading || isProductReviewsLoading || !productData || !productReviewsData) {
    return <Container>Loading</Container>
  }

  return (
    <Container>
      <View layout='row-space-between-center' hasBorderBottom>
        <Headline size='large'>{productData.data.title}</Headline>
        <View>
          <Button type='primary' url='/register'>Register</Button>
          <Button type='secondary' url='/login'>Login</Button>
        </View>
      </View>
      <View hasBorderBottom>
        <Rating
          averageRating={productReviewsData.data.stats.average_rating} ratingsCount={productReviewsData.data.reviews.length}
        />
      </View>
    </Container>
  )
}