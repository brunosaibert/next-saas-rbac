import { ability, getCurrentOrg } from '@/auth/auth'

import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function Tabs() {
  const currentOrg = await getCurrentOrg()

  const permissions = await ability()

  const canGetProjects = permissions?.can('get', 'Project')
  const canGetMembers = permissions?.can('get', 'User')
  const canUptadeOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-1">
        {canGetProjects && (
          <Button
            asChild
            className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
            size="sm"
            variant="ghost"
          >
            <NavLink href={`/org/${currentOrg}`}>Projects</NavLink>
          </Button>
        )}
        {canGetMembers && (
          <Button
            asChild
            className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
            size="sm"
            variant="ghost"
          >
            <NavLink href={`/org/${currentOrg}/members`}>Members</NavLink>
          </Button>
        )}
        {(canUptadeOrganization || canGetBilling) && (
          <Button
            asChild
            className="text-muted-foreground data-[current=true]:text-foreground data-[current=true]:border-border border border-transparent"
            size="sm"
            variant="ghost"
          >
            <NavLink href={`/org/${currentOrg}/settings`}>
              Settings & Billing
            </NavLink>
          </Button>
        )}
      </nav>
    </div>
  )
}
