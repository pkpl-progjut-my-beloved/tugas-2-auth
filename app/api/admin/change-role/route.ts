import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const userId = formData.get('userId') as string
  const newRole = formData.get('newRole') as string

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // re-verify the requester identity and role for server-side security enforcement
  const { data: { user } } = await supabase.auth.getUser()
  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single()

  // stop the process if the requester does not have sufficient administrative privileges
  if (adminProfile?.role !== 'SUPER_ADMIN' && adminProfile?.role !== 'ADMIN') {
    return new Response('unauthorized', { status: 401 })
  }

  // perform the database update operation to change the target user role
  await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)

  // redirect back to the admin management page after successful update
  return NextResponse.redirect(new URL('/admin', request.url), { status: 303 })
}