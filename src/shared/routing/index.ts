import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from 'atomic-router'
import { sample } from 'effector'
import { createBrowserHistory } from 'history'

import { appStarted } from '@/shared/config/init'

export const routes = {
  home: createRoute(),
  auth: {
    signUp: createRoute(),
    signIn: createRoute(),
  },
}

export const controls = createRouterControls()

export const router = createHistoryRouter({
  routes: [
    {
      path: '/sign-up',
      route: routes.auth.signUp,
    },
    {
      path: '/sign-in',
      route: routes.auth.signIn,
    },
    {
      path: '/',
      route: routes.home,
    },
  ],
  controls,
})

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
})
