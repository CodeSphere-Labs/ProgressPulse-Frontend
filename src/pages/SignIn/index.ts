import { createRouteView } from 'atomic-router-react'
import { lazy } from 'react'

import { LoadingScreen } from '@/shared/ui/LoadingScreen'

import { anonymousRoute, currentRoute } from './model'

export const SignInPage = lazy(() => import('./SignIn'))

export const SignInRoute = {
  view: createRouteView({
    route: anonymousRoute,
    view: SignInPage,
    otherwise: LoadingScreen,
  }),
  route: currentRoute,
}
