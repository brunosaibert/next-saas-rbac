import { api } from './api-client'

interface revokeInviteRequest {
  inviteId: string
  org: string
}

export async function revokeInvite({ org, inviteId }: revokeInviteRequest) {
  await api.delete(`organizations/${org}/invites/${inviteId}`)
}
