'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useActionState } from 'react'

import GithubIcon from '@/assets/github.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithEmailAndPassword,
    null,
  )

  return (
    <form action={formAction} className="space-y-4">
      <h1>{state}</h1>
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
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
      <Button className="w-full" type="submit" variant="outline">
        <Image alt="" className="mr-2 size-4 dark:invert" src={GithubIcon} />
        Sign in with Github
      </Button>
    </form>
  )
}
