'use server'

import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'

const schema = z
  .object({
    name: z
      .string({ message: 'Please, enter your name.' })
      .refine((value) => value.split(' ').length > 1, {
        message: 'Please, enter your full name',
      }),
    email: z.email({ message: 'Please, provide a valid e-mail address.' }),
    password: z
      .string()
      .min(6, { message: 'Password should have at least 6 characters.' }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password confirmation does not match.',
    path: ['passwordConfirmation'],
  })

export async function signUpAction(_: unknown, data: FormData) {
  const result = schema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors

    const { name, email, password } = Object.fromEntries(data)

    const payload = {
      name: String(name),
      email: String(email),
      password: String(password),
    }

    return { success: false, message: null, errors, payload }
  }

  const { name, email, password } = result.data

  const payload = {
    name,
    email,
    password,
  }

  try {
    await signUp({
      name,
      email,
      password,
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

  redirect('/auth/sign-in')
}
