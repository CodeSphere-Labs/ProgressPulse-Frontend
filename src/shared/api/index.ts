import { createJsonMutation, declareParams } from '@farfetched/core'

import { RefreshTokenContract, SignInContract } from '@/shared/api/contracts'
import { SignInRequest, SignInResponse } from '@/shared/api/types'

const baseUrl = (path: string) => {
  return `${import.meta.env.VITE_API_URL}${path}`
}

export const signInMutation = createJsonMutation<SignInRequest, SignInResponse>(
  {
    params: declareParams<SignInRequest>(),
    request: {
      method: 'POST',
      url: baseUrl('/auth/sign-in'),
      body: ({ email, password }) => ({ email, password }),
      credentials: 'include',
    },
    response: {
      contract: SignInContract,
    },
  },
)

export const refreshTokenMutation = createJsonMutation({
  request: {
    method: 'GET',
    url: baseUrl('/auth/refresh-token'),
    credentials: 'include',
  },
  response: {
    contract: RefreshTokenContract,
  },
})
