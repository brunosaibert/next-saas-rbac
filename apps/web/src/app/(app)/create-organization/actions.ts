'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { createOrganization } from '@/http/create-organization'

const schema = z
  .object({
    name: z
      .string()
      .min(4, { message: 'Please, include at least 4 characters.' }),
    domain: z
      .string()
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

            return domainRegex.test(value)
          }

          return true
        },
        {
          message: 'Please, enter a valid domain',
        },
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === true || value === 'on')
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }

      return true
    },
    {
      message: 'Domain is required when auto-join is enebled.',
      path: ['domain'],
    },
  )

export async function createOrganizationAction(_: unknown, data: FormData) {
  const result = schema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors

    const { name, domain, shouldAttachUsersByDomain } = Object.fromEntries(data)

    const payload = {
      name: String(name),
      domain: String(domain),
      shouldAttachUsersByDomain: String(shouldAttachUsersByDomain),
    }

    return { success: false, message: null, errors, payload }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  const payload = {
    name,
    domain,
    shouldAttachUsersByDomain,
  }

  try {
    await createOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
    })
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
    message: 'Successfully saved the organization.',
    errors: null,
    payload,
  }
}
