import { Container } from "../components/container.component"
import { View } from "../components/view.component"
import { useFetch } from "../hooks/useFetch.hook"

export const ProductRoute = () => {
  const { loading, error, data } = useFetch('/products/1')

  if (error) {
    return <Container>An error occurred while loading this product.</Container>
  }

  if (loading || !data) {
    return <Container>Loading</Container>
  }

  return <Container>
    <View hasBorderBottom>{data.data.title}</View>
  </Container>
}