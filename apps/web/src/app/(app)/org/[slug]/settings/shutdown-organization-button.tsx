import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { shutdownOrganization } from '@/http/shutdown-organization'

export function ShutdownOrganizationButton() {
  async function shutdownOrganizationAction() {
    'use server'

    const currentOrg = await getCurrentOrg()

    await shutdownOrganization(currentOrg!)

    redirect('/')
  }

  return (
    <form action={shutdownOrganizationAction}>
      <Button className="w-56" type="submit" variant="destructive">
        <XCircle className="size-4" />
        Shutdown organization
      </Button>
    </form>
  )
}
