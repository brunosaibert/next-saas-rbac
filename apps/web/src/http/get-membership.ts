import { Role } from '@saas/auth'

import { api } from './api-client'

interface GetMembershipResponse {
  membership: {
    id: string
    role: Role
    userId: string
    organizationId: string
  }
}

export function getMembership(org: string) {
  return api
    .get(`organizations/${org}/membership`)
    .json<GetMembershipResponse>()
}
