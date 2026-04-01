import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ThemeForm from './ThemeForm'

export default async function SettingsPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role === 'VIEWER') redirect('/')

    const { data: settings } = await supabase.from('web_settings').select('*').single()
    return <ThemeForm initialSettings={settings} />
}