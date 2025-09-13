'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createProject } from '@/http/create-project'

const schema = z.object({
  name: z
    .string()
    .min(4, { message: 'Please, include at least 4 characters.' }),
  description: z.string(),
})

export async function createProjectAction(_: unknown, data: FormData) {
  const result = schema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors

    const { name, description } = Object.fromEntries(data)

    const payload = {
      name: String(name),
      description: String(description),
    }

    return { success: false, message: null, errors, payload }
  }

  const { name, description } = result.data

  const payload = {
    name,
    description,
  }

  const currentOrg = await getCurrentOrg()

  if (!currentOrg) {
    return {
      success: false,
      message: 'Please select an organization.',
      errors: null,
      payload,
    }
  }

  try {
    await createProject({
      name,
      description,
      orgSlug: currentOrg,
    })

    revalidateTag(`${currentOrg}/projects`)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return { success: false, message, errors: null, payload }
    }

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
      payload,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the project.',
    errors: null,
    payload,
  }
}
