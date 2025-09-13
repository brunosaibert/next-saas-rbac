import { Plus } from 'lucide-react'
import Link from 'next/link'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Button } from '@/components/ui/button'

import { ProjectList } from './project-list'

export default async function Projects() {
  const currentOrg = await getCurrentOrg()
  const permission = await ability()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        {permission?.can('create', 'Project') && (
          <Button asChild size="sm">
            <Link href={`/org/${currentOrg}/create-project`}>
              <Plus className="size-4" />
              Create project
            </Link>
          </Button>
        )}
      </div>
      {permission?.can('get', 'Project') ? (
        <ProjectList />
      ) : (
        <p className="text-muted-foreground text-sm">
          You do not have permission to view projects in this organization.
        </p>
      )}
    </div>
  )
}
