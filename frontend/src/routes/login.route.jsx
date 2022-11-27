import { useEffect } from "react"
import { useState } from "react"
import { Button } from "../components/button.component"
import { Container } from "../components/container.component"
import { Form } from "../components/form.component"
import { Headline } from "../components/headline.component"
import { Input } from "../components/input.component"
import { View } from "../components/view.component"
import { toApiUrl } from "../hooks/useFetch.hook"
import { API_TOKEN_KEY } from '../constants'

export const LoginRoute = () => {
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  })
  const [loginError, setLoginError] = useState(null)

  useEffect(() => {
    if (window.localStorage.getItem(API_TOKEN_KEY)) {
      document.location = '/'
    }
  }, [])

  const onLogin = async (event) => {
    event.preventDefault()

    const loginResponse = await fetch(toApiUrl('/auth/login'), {
      method: 'POST',
      body: JSON.stringify(loginInput),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const loginBody = await loginResponse.json()

    if (loginResponse.status !== 200) {
      setLoginError(loginBody.errors[0])
      return
    }

    window.localStorage.setItem(API_TOKEN_KEY, loginBody.data.token)

    document.location = '/'
  }

  return <Container>
    <View layout='row-space-between-center' hasBorderBottom>
      <Headline size='large'>Login</Headline>
      <Button type='secondary' url='/register'>Register</Button>
    </View>
    {loginError && (
      <View hasBorderBottom>{loginError}</View>
    )}
    <View>
      <Form>
        <Input
          type='email'
          value={loginInput.email}
          placeholder="Your Email"
          onChange={(event) => setLoginInput({ ...loginInput, email: event.target.value })}
        />
        <Input
          type='password'
          value={loginInput.password}
          placeholder="Your Password"
          onChange={(event) => setLoginInput({ ...loginInput, password: event.target.value })}
        />
        <Button
          type='primary'
          isDisabled={!loginInput.email || !loginInput.password}
          onClick={onLogin}
        >
          Login
        </Button>
      </Form>
    </View>
  </Container>
}