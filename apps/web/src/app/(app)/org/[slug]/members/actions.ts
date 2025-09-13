'use server'

import { Role, roleSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import z from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { createInvite } from '@/http/create-invite'
import { removeMember } from '@/http/remove-member'
import { revokeInvite } from '@/http/revoke-invite'
import { updateMember } from '@/http/update-member'

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg()

  await removeMember({
    org: currentOrg!,
    memberId,
  })

  revalidateTag(`${currentOrg}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg()

  await updateMember({
    org: currentOrg!,
    memberId,
    role,
  })

  revalidateTag(`${currentOrg}/members`)
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg()

  await revokeInvite({
    org: currentOrg!,
    inviteId,
  })

  revalidateTag(`${currentOrg}/invites`)
}

const inviteSchema = z.object({
  email: z.email({ message: 'Please, enter a valid email address.' }),
  role: roleSchema,
})

export async function createInviteAction(_: unknown, data: FormData) {
  const result = inviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors

    const { email, role } = Object.fromEntries(data)

    const payload = {
      email: String(email),
      role: String(role),
    }

    return { success: false, message: null, errors, payload }
  }

  const { email, role } = result.data

  const payload = {
    email,
    role,
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
    await createInvite({
      email,
      role,
      orgSlug: currentOrg,
    })

    revalidateTag(`${currentOrg}/invites`)
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
    message: 'Successfully created the invite.',
    errors: null,
    payload: {
      email: '',
      role: 'MEMBER',
    },
  }
}
