import { Role } from '@saas/auth'

import { api } from './api-client'

interface CreateInviteRequest {
  email: string
  role: Role
  orgSlug: string
}

type CreateInviteResponse = {
  inviteId: string
}

export async function createInvite({
  email,
  role,
  orgSlug,
}: CreateInviteRequest) {
  const result = await api
    .post(`organizations/${orgSlug}/invites`, {
      json: {
        email,
        role,
      },
    })
    .json<CreateInviteResponse>()

  return result
}
