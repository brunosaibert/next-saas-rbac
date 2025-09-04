'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { signInWithPassword } from '@/http/sign-in-with-password'

const schema = z.object({
  email: z.email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})

export async function signInWithEmailAndPassword(_: unknown, data: FormData) {
  const result = schema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors

    const { email, password } = Object.fromEntries(data)

    const payload = {
      email: String(email),
      password: String(password),
    }

    return { success: false, message: null, errors, payload }
  }

  const { email, password } = result.data

  const payload = {
    email,
    password,
  }

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })

    const cookieStore = await cookies()

    cookieStore.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7days
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

  redirect('/')
}
