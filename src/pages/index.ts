import { createRoutesView } from 'atomic-router-react'

import { NotFoundPage } from '@/pages/NotFound/NotFound'

import { HomeRoute } from './Home'
import { SignInRoute } from './SignIn'
import { SignUpRoute } from './SignUp'

export const Pages = createRoutesView({
  routes: [HomeRoute, SignInRoute, SignUpRoute],
  otherwise: NotFoundPage,
})
