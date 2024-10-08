import { createRouteView } from 'atomic-router-react'
import { lazy } from 'react'

import { LoadingScreen } from '@/shared/ui/LoadingScreen'

import { authorizedRoute, currentRoute } from './model'

export const HomePage = lazy(() => import('./Home'))

export const HomeRoute = {
  view: createRouteView({
    route: authorizedRoute,
    view: HomePage,
    otherwise: LoadingScreen,
  }),
  route: currentRoute,
}
