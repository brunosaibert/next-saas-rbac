import { api } from './api-client'

export async function shutdownOrganization(slug: string) {
  await api.delete(`organizations/${slug}`)
}
