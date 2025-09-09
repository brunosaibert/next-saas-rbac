import { Role } from '@saas/auth'

import { api } from './api-client'

interface GetMembersResponse {
  members: {
    userId: string
    id: string
    role: Role
    name: string | null
    avatarUrl: string | null
    email: string
  }[]
}

export async function getMembers(slug: string) {
  const result = await api
    .get(`organizations/${slug}/members`, {
      next: {
        tags: [`${slug}/members`],
      },
    })
    .json<GetMembersResponse>()

  return result
}
