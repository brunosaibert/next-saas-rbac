import { XOctagon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { revokeInviteAction } from './actions'

interface Props {
  inviteId: string
}

export async function RevokeInviteButton({ inviteId }: Props) {
  return (
    <form action={revokeInviteAction.bind(null, inviteId)}>
      <Button size="sm" variant="destructive">
        <XOctagon className="size-4" />
        Revoke invite
      </Button>
    </form>
  )
}
