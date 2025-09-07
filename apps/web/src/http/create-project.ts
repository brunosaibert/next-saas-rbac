import { api } from './api-client'

interface CreateProjectRequest {
  name: string
  description: string
  orgSlug: string
}

type CreateProjectResponse = {
  projectId: string
}

export async function createProject({
  name,
  description,
  orgSlug,
}: CreateProjectRequest) {
  const result = await api
    .post(`organizations/${orgSlug}/projects`, {
      json: {
        name,
        description,
      },
    })
    .json<CreateProjectResponse>()

  return result
}
