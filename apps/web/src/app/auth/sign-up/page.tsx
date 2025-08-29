import Image from 'next/image'
import Link from 'next/link'

import GithubIcon from '@/assets/github.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirm your password</Label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
        />
      </div>
      <Button className="w-full" type="submit">
        Create account
      </Button>
      <Button asChild className="w-full" size="sm" variant="link">
        <Link href="/auth/sign-in">Already registered? Sing in</Link>
      </Button>
      <Separator />
      <Button className="w-full" type="submit" variant="outline">
        <Image alt="" className="mr-2 size-4 dark:invert" src={GithubIcon} />
        Sign up with Github
      </Button>
    </form>
  )
}
