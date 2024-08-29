import { chainAuthorized } from '@/shared/api/auth/auth'
import { routes } from '@/shared/routing'

export const currentRoute = routes.home

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signIn.open,
})

/*
 * route.opened
 * $alreadyAuthorized === false
 * sessionRequest ( refreshTokenMutation )
 * wait
 * sessionRequest.success
 * authRoute.opened
 */

/*
 * route.opened
 * $alreadyAuthorized === false
 * sessionRequest ( refreshTokenMutation )
 * wait
 * sessionRequest.failed
 * route !== sign-in/sign-up
 * redirect to sign-in
 */

/*
 * route.opened
 * $alreadyAuthorized === true
 * authRoute.opened
 */

/*
 * route.opened
 * $alreadyAuthorized === false
 * sessionRequest ( refreshTokenMutation )
 * wait
 * route.closed
 * sessionRequest.success
 * do nohting
 */
