import { createRouteView } from 'atomic-router-react'
import { lazy } from 'react'

import { LoadingScreen } from '@/shared/ui/LoadingScreen'

import { anonymousRoute, currentRoute } from './model'

const SignUpPage = lazy(() => import('./SignUp'))

export const SignUpRoute = {
  view: createRouteView({
    route: anonymousRoute,
    view: SignUpPage,
    otherwise: LoadingScreen,
  }),
  route: currentRoute,
}
