import { api } from './api-client'

interface GetOrganizationsResponse {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
  }[]
}

export function getOrganizations() {
  return api.get('organizations').json<GetOrganizationsResponse>()
}
