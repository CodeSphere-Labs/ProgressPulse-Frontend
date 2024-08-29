import { chainAnonymous } from '@/shared/api/auth/auth'
import { routes } from '@/shared/routing'

export const currentRoute = routes.auth.signUp
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.home.open,
})
