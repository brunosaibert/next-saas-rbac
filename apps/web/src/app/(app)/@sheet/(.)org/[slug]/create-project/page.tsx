'use client'

import { useRouter } from 'next/navigation'

import { ProjectForm } from '@/app/(app)/org/[slug]/create-project/project-form'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

export default function CreateProject() {
  const router = useRouter()

  return (
    <Sheet
      defaultOpen
      onOpenChange={() => {
        router.back()
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <ProjectForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}
