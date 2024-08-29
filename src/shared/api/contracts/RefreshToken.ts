import { num, obj, or, str, val } from '@withease/contracts'

export const RefreshTokenContract = obj({
  id: num,
  first_name: str,
  last_name: str,
  patronymic: str,
  email: str,
  role: or(val('YODA'), val('JEDI'), val('PADAWAN')),
  accessToken: str,
})
