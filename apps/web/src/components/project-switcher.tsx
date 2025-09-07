'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronsUpDown, Loader2, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { getProjects } from '@/http/get-projects'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string
    project: string
  }>()

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  })

  const currentProject =
    data && projectSlug
      ? data.projects.find((project) => project.slug === projectSlug)
      : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-primary flex w-[168px] cursor-pointer items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2">
        {isLoading ? (
          <>
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : (
          <>
            {currentProject ? (
              <>
                <Avatar className="size-4">
                  {currentProject.avatarUrl && (
                    <AvatarImage alt="logo" src={currentProject.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>
                <span className="truncate text-left">
                  {currentProject.name}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">Select project</span>
            )}
          </>
        )}
        {isLoading ? (
          <Loader2 className="text-muted-foreground ml-auto size-4 shrink-0 animate-spin" />
        ) : (
          <ChevronsUpDown className="text-muted-foreground ml-auto size-4 shrink-0" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        className="w-[200px]"
        sideOffset={12}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {data &&
            data.projects.map((project) => {
              return (
                <DropdownMenuItem asChild key={project.id}>
                  <Link
                    className="cursor-pointer"
                    href={`/org/${orgSlug}/project/${project.slug}`}
                  >
                    <Avatar className="size-4">
                      {project.avatarUrl && (
                        <AvatarImage alt="logo" src={project.avatarUrl} />
                      )}
                      <AvatarFallback />
                    </Avatar>
                    <span className="line-clamp-1">{project.name}</span>
                  </Link>
                </DropdownMenuItem>
              )
            })}
          <DropdownMenuSeparator />
        </DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link
            className="cursor-pointer"
            href={`/org/${orgSlug}/create-project`}
          >
            <PlusCircle className="size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
