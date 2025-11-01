'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useActionState } from 'react'

import GithubIcon from '@/assets/github.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithGithub } from '../actions'
import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const params = useSearchParams()

  const email = params.get('email') ?? ''

  const [{ success, message, errors, payload }, formAction, isPending] =
    useActionState(signInWithEmailAndPassword, {
      success: false,
      message: null,
      errors: null,
      payload: {
        email,
        password: '',
      },
    })

  return (
    <form action={formAction} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input
          defaultValue={payload?.email}
          id="email"
          name="email"
          type="email"
        />
        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          defaultValue={payload?.password}
          id="password"
          name="password"
          type="password"
        />
        {errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}
        <Link
          className="text-foreground text-xs font-medium hover:underline"
          href="/auth/forgot-password"
        >
          Forgot your password?
        </Link>
      </div>
      <Button className="w-full" disabled={isPending} type="submit">
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Sign in with e-mail'
        )}
      </Button>
      <Button asChild className="w-full" size="sm" variant="link">
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>
      <Separator />
      <Button
        className="w-full"
        formAction={signInWithGithub}
        type="submit"
        variant="outline"
      >
        <Image alt="" className="mr-2 size-4 dark:invert" src={GithubIcon} />
        Sign in with Github
      </Button>
    </form>
  )
}
