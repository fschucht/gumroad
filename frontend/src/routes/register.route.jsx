import { useState } from "react"
import { Button } from "../components/button.component"
import { Container } from "../components/container.component"
import { Form } from "../components/form.component"
import { Headline } from "../components/headline.component"
import { Input } from "../components/input.component"
import { View } from "../components/view.component"
import { toApiUrl } from "../hooks/useFetch.hook"

export const RegisterRoute = () => {
  const [registrationInput, setRegistrationInput] = useState({
    email: '',
    password: '',
  })
  const [registrationError, setRegistrationError] = useState(null)

  console.log(registrationError)

  const onRegister = async (event) => {
    event.preventDefault()

    setRegistrationError(null)

    const registerResponse = await fetch(toApiUrl('/users'), {
      method: 'POST',
      body: JSON.stringify(registrationInput),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const registerBody = await registerResponse.json()

    if (registerResponse.status !== 201) {
      setRegistrationError(registerBody.errors[0])
      return
    }

    const loginResponse = await fetch(toApiUrl('/auth/login'), {
      method: 'POST',
      body: JSON.stringify(registrationInput),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const loginBody = await loginResponse.json()

    if (loginResponse.status !== 200) {
      setRegistrationError(loginBody.errors[0])
      return
    }

    window.localStorage.setItem('api-token', loginBody.data.token)

    document.location = '/'
  }

  return <Container>
    <View layout='row-space-between-center' hasBorderBottom>
      <Headline size='large'>Register</Headline>
      <Button type='secondary' url='/login'>Login</Button>
    </View>
    {registrationError && (
      <View hasBorderBottom>{registrationError}</View>
    )}
    <View>
      <Form>
        <Input
          type='email'
          value={registrationInput.email}
          placeholder="Your Email"
          onChange={(event) => setRegistrationInput({ ...registrationInput, email: event.target.value })}
        />
        <Input
          type='password'
          value={registrationInput.password}
          placeholder="Your Password"
          onChange={(event) => setRegistrationInput({ ...registrationInput, password: event.target.value })}
        />
        <Button
          type='primary'
          isDisabled={!registrationInput.email || !registrationInput.password}
          onClick={onRegister}
        >
          Register
        </Button>
      </Form>
    </View>
  </Container>
}