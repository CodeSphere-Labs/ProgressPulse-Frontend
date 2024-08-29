import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useUnit } from 'effector-react'

import {
  $email,
  $isError,
  $loading,
  $password,
  emailChanged,
  formSubmitted,
  passwordChanged,
} from './model'
import classes from './SignIn.module.css'

const SignIn = () => {
  const [
    email,
    password,
    isError,
    loading,
    emailChange,
    formSubmit,
    passwordChange,
  ] = useUnit([
    $email,
    $password,
    $isError,
    $loading,
    emailChanged,
    formSubmitted,
    passwordChanged,
  ])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    formSubmit()
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Progress Pulse
      </Title>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
      >
        <TextInput
          disabled={loading}
          value={email}
          onChange={(event) => emailChange(event.target.value)}
          label="Email"
          placeholder="you@mail.dev"
          required
        />
        <PasswordInput
          disabled={loading}
          value={password}
          onChange={(event) => passwordChange(event.target.value)}
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Stack h={20}>
          {isError && (
            <Text p={5} pt={15} c="red">
              Incorrect email or password
            </Text>
          )}
        </Stack>
        <Button loading={loading} type="submit" fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
    </Container>
  )
}

// eslint-disable-next-line import/no-default-export
export default SignIn
