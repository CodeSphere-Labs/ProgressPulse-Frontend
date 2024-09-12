import {
  chainRoute,
  RouteInstance,
  type RouteParams,
  RouteParamsAndQuery,
} from 'atomic-router'
import { createEvent, createStore, Effect, Event, sample } from 'effector'

import { refreshTokenMutation, signInMutation } from '@/shared/api'

export type Role = 'YODA' | 'JEDI' | 'PADAWAN'

interface ChainParams<Params extends RouteParams> {
  otherwise?: Event<void> | Effect<void, any, any>
}

enum AuthStatus {
  Initial = 'Initial',
  Pending = 'Pending',
  Authenticated = 'Authenticated',
  Anonymous = 'Anonymous',
}

interface User {
  id: number
  first_name: string
  last_name: string
  patronymic: string

  email: string
  role: Role
}

export const $user = createStore<User | null>(null)

const $authenticationStatus = createStore(AuthStatus.Initial)

$authenticationStatus.on(signInMutation.start, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending
  return status
})

$user.on(signInMutation.finished.success, (_, response) => response.result)
$user.on(
  refreshTokenMutation.finished.success,
  (_, response) => response.result,
)

$authenticationStatus.on(
  signInMutation.finished.success,
  () => AuthStatus.Authenticated,
)
$authenticationStatus.on(
  refreshTokenMutation.finished.success,
  () => AuthStatus.Authenticated,
)

$authenticationStatus.on(
  refreshTokenMutation.finished.failure,
  () => AuthStatus.Anonymous,
)
$authenticationStatus.on(
  signInMutation.finished.failure,
  () => AuthStatus.Anonymous,
)

export const chainAuthorized = <Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams<Params> = {},
) => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()
  const sessionRecievedAnonymous = createEvent<RouteParamsAndQuery<Params>>()

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  })

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  })

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: refreshTokenMutation.start,
  })

  sample({
    clock: [alreadyAnonymous, refreshTokenMutation.finished.failure],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionRecievedAnonymous,
  })

  if (otherwise) {
    sample({
      clock: sessionRecievedAnonymous,
      target: otherwise as Effect<void, any, any>,
    })
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthorized, refreshTokenMutation.finished.success],
    cancelOn: sessionRecievedAnonymous,
  })
}

export const chainAnonymous = <Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams<Params> = {},
) => {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()
  const sessionRecievedAuthenticated =
    createEvent<RouteParamsAndQuery<Params>>()

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  })

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  })

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: refreshTokenMutation.start,
  })

  sample({
    clock: [alreadyAuthorized, refreshTokenMutation.finished.success],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionRecievedAuthenticated,
  })

  if (otherwise) {
    sample({
      clock: sessionRecievedAuthenticated,
      target: otherwise as Effect<void, any, any>,
    })
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, refreshTokenMutation.finished.failure],
    cancelOn: sessionRecievedAuthenticated,
  })
}
