import { organizationSchema } from '@saas/auth'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'
import Image from 'next/image'

import { ability, getCurrentMembership, getCurrentOrg } from '@/auth/auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getOrganization } from '@/http/get-organization'

import { removeMemberAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export default async function MemberList() {
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()

  const [currentMembership, { members }, { organization }] = await Promise.all([
    getCurrentMembership(),
    getMembers(currentOrg!),
    getOrganization(currentOrg!),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>
      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => {
              return (
                <TableRow key={member.id}>
                  <TableCell className="py-2.5" style={{ width: 48 }}>
                    <Avatar>
                      <AvatarFallback />
                      {member.avatarUrl && (
                        <Image
                          alt=""
                          className="aspect-square size-full"
                          height={32}
                          src={member.avatarUrl}
                          width={32}
                        />
                      )}
                    </Avatar>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-2 font-medium">
                        {member.name}
                        {member.userId === currentMembership?.userId && ' (me)'}
                        {organization.ownerId === member.userId && (
                          <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
                            <Crown className="size-3" />
                            Owner
                          </span>
                        )}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      {permissions?.can(
                        'transfer_ownership',
                        authOrganization,
                      ) && (
                        <Button size="sm" variant="ghost">
                          <ArrowLeftRight className="mr-2 size-4" />
                          Transfer ownership
                        </Button>
                      )}
                      <UpdateMemberRoleSelect
                        disabled={
                          member.userId === currentMembership?.userId ||
                          member.userId === organization.ownerId ||
                          permissions?.cannot('update', 'User')
                        }
                        memberId={member.id}
                        value={member.role}
                      />
                      {permissions?.can('delete', 'User') && (
                        <form action={removeMemberAction.bind(null, member.id)}>
                          <Button
                            disabled={
                              member.userId === currentMembership?.userId ||
                              member.userId === organization.ownerId
                            }
                            size="sm"
                            type="submit"
                            variant="destructive"
                          >
                            <UserMinus className="size-4" />
                            Remove
                          </Button>
                        </form>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
