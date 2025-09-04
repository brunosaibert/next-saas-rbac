'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'

import GithubIcon from '@/assets/github.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithGithub } from '../actions'
import { signUpAction } from './actions'

export function SignUpForm() {
  const [{ success, message, errors, payload }, formAction, isPending] =
    useActionState(signUpAction, {
      success: false,
      message: null,
      errors: null,
      payload: {
        name: '',
        email: '',
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
        <Label htmlFor="name">Name</Label>
        <Input defaultValue={payload?.name} id="name" name="name" />
        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>
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
      </div>
      <div className="space-y-1">
        <Label htmlFor="passwordConfirmation">Confirm your password</Label>
        <Input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
        />
        {errors?.passwordConfirmation && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.passwordConfirmation[0]}
          </p>
        )}
      </div>
      <Button className="w-full" disabled={isPending} type="submit">
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Create account'
        )}
      </Button>
      <Button asChild className="w-full" size="sm" variant="link">
        <Link href="/auth/sign-in">Already registered? Sing in</Link>
      </Button>
      <Separator />
      <Button
        className="w-full"
        formAction={signInWithGithub}
        type="submit"
        variant="outline"
      >
        <Image alt="" className="mr-2 size-4 dark:invert" src={GithubIcon} />
        Sign up with Github
      </Button>
    </form>
  )
}
