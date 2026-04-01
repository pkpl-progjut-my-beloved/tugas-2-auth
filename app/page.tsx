import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LogoutButton from '@/app/components/LogoutButton'
import Link from 'next/link'
import UserAvatar from '@/app/components/UserAvatar'

export default async function HomePage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: settings } = await supabase.from('web_settings').select('*').single()

  const isAdmin = profile?.role === 'SUPER_ADMIN' || profile?.role === 'ADMIN'

  return (
    <div
      className="min-h-screen text-[#c9d1d9] transition-all duration-700"
      style={{
        backgroundColor: '#0d1117',
        backgroundImage: `radial-gradient(circle at top, ${settings?.primary_color}10, #0d1117)`,
      }}
    >
      <nav className="bg-[#161b22] border-b border-[#30363d] py-3 sticky top-0 z-50 font-sans">
        <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center text-sm font-medium">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#f0f6fc]">MANUSIA HITAM</span>
            <span className="text-[10px] border border-[#30363d] px-2 py-0.5 rounded-full text-[#8b949e] font-bold uppercase tracking-tight">
              {profile?.role.toLowerCase()}
            </span>
          </div>
          <div className="flex gap-6 items-center">
            {isAdmin && (
              <>
                <Link href="/admin" className="text-[#8b949e] hover:text-[#58a6ff] transition-all font-bold">Directory</Link>
                <Link href="/settings" className="bg-[#21262d] border border-[#30363d] px-3 py-1.5 rounded-md hover:bg-[#30363d] text-[#f0f6fc] transition-all font-bold">
                  Edit page
                </Link>
              </>
            )}
            <LogoutButton />
          </div>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto pt-16 px-8" style={{ fontFamily: settings?.font_family || 'var(--font-inter)' }}>
        <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-12 mb-8 shadow-sm relative overflow-hidden text-left" style={{ borderLeft: `6px solid ${settings?.primary_color}` }}>
          <h2 className="text-4xl font-bold text-[#f0f6fc] mb-6 tracking-tight">
            Designing with purpose & grace.
          </h2>
          <div className="max-w-3xl space-y-4 text-[#8b949e] text-lg leading-relaxed font-medium">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-[#30363d] flex items-center gap-4">
            <UserAvatar src={profile?.avatar_url} name={profile?.full_name} />
            <div>
              <p className="text-xs text-[#8b949e] mb-0.5 font-medium">Authenticated as</p>
              <p className="font-bold text-[#f0f6fc]">{profile?.full_name}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}