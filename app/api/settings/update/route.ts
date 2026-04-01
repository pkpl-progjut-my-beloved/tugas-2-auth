import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const formData = await request.formData()
    const primaryColor = formData.get('primary_color') as string
    const fontFamily = formData.get('font_family') as string

    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    // check if the user is authorized to update global website settings
    const { data: { user } } = await supabase.auth.getUser()
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user?.id)
        .single()

    if (profile?.role !== 'SUPER_ADMIN' && profile?.role !== 'ADMIN') {
        return new Response('unauthorized access', { status: 401 })
    }

    // update the single row of settings in the database
    await supabase
        .from('web_settings')
        .update({ primary_color: primaryColor, font_family: fontFamily })
        .eq('id', 1)

    // redirect back to home to see the changes immediately
    return NextResponse.redirect(new URL('/', request.url), { status: 303 })
}