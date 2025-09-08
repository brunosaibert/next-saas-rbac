import { api } from './api-client'

interface GetProjectsResponse {
  projects: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
    ownerId: string
    organizationId: string
    description: string
    createdAt: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }[]
}

export async function getProjects(slug: string) {
  const result = await api
    .get(`organizations/${slug}/projects`)
    .json<GetProjectsResponse>()

  return result
}
