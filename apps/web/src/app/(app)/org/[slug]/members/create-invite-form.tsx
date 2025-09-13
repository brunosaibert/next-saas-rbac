'use client'

import { Select } from '@radix-ui/react-select'
import { AlertTriangle, Loader2, UserPlus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useActionState } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { queryClient } from '@/lib/react-query'

import { createInviteAction } from './actions'

export function CreateInviteForm() {
  const { slug: org } = useParams<{ slug: string }>()

  const [{ success, message, errors, payload }, formAction, isPending] =
    useActionState(createInviteAction, {
      success: false,
      message: null,
      errors: null,
      payload: {
        email: '',
        role: 'MEMBER',
      },
    })

  if (success) {
    queryClient.invalidateQueries({
      queryKey: [org, 'invites'],
    })
  }

  return (
    <form action={formAction} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Invite failed!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <Input
            defaultValue={payload?.email}
            id="email"
            name="email"
            placeholder="john@example.com"
            type="email"
          />
        </div>
        <Select defaultValue="MEMBER" name="role">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="MEMBER">Member</SelectItem>
            <SelectItem value="BILLING">Billing</SelectItem>
          </SelectContent>
        </Select>
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="size-4" />
              Invite user
            </>
          )}
        </Button>
      </div>
      {errors?.email && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400">
          {errors.email[0]}
        </p>
      )}
    </form>
  )
}
