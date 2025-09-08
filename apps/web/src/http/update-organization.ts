import { api } from './api-client'

interface UpdateOrganizationRequest {
  slug: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationResponse = {
  organizationId: string
}

export async function updateOrganization({
  slug,
  name,
  domain,
  shouldAttachUsersByDomain,
}: UpdateOrganizationRequest) {
  const result = await api
    .put(`organizations/${slug}`, {
      json: {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
    })
    .json<UpdateOrganizationResponse>()

  return result
}
