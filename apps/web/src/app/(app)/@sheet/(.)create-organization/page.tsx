'use client'

import { useRouter } from 'next/navigation'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { OrganizationForm } from '../../org/organization-form'

export default function CreateOrganization() {
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
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <OrganizationForm />
        </div>
      </SheetContent>
    </Sheet>
  )
}
