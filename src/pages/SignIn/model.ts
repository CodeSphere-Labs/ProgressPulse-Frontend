import { createEvent, createStore, sample } from 'effector'

import { refreshTokenMutation, signInMutation } from '@/shared/api'
import { chainAnonymous } from '@/shared/api/auth/auth'
import { routes } from '@/shared/routing'

export const currentRoute = routes.auth.signIn

export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.home.open,
})

export const $email = createStore('')
export const $password = createStore('')
export const $isError = signInMutation.$failed.map((isFailed) => isFailed)
export const $loading = signInMutation.$pending

export const emailChanged = createEvent<string>()
export const passwordChanged = createEvent<string>()
export const formSubmitted = createEvent()

$email.on(emailChanged, (_, email) => email)
$password.on(passwordChanged, (_, password) => password)

sample({
  clock: formSubmitted,
  source: [$email, $password],
  fn: ([email, password]) => ({ email, password }),
  target: signInMutation.start,
})

sample({
  clock: signInMutation.finished.success,
  target: refreshTokenMutation.start,
})
