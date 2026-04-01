import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LogoutButton from '@/app/components/LogoutButton'
import Link from 'next/link'

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
      className="min-h-screen text-white transition-all duration-1000 overflow-x-hidden"
      style={{ backgroundColor: settings?.primary_color, fontFamily: settings?.font_family }}
    >
      {/* soft dark overlay to prevent eye strain */}
      <div className="fixed inset-0 bg-black/40 pointer-events-none" />

      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/5 px-10 py-6 flex justify-between items-center">
        <div className="flex items-center gap-6 relative z-10">
          <span className="font-black text-2xl tracking-tighter uppercase italic tracking-[0.1em]">Manusia Hitam</span>
          <span className="text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full font-black text-white/40 tracking-widest">{profile?.role}</span>
        </div>
        <div className="flex gap-10 items-center font-bold text-[10px] uppercase tracking-[0.2em] relative z-10">
          {isAdmin && (
            <>
              <Link href="/admin" className="text-white/40 hover:text-white transition-all">Admin Panel</Link>
              <Link href="/settings" className="bg-white/5 hover:bg-white hover:text-black px-6 py-3 rounded-full transition-all border border-white/10 shadow-lg">customize</Link>
            </>
          )}
          <LogoutButton />
        </div>
      </nav>

      <main className="relative z-10 pt-48 pb-32 px-8 max-w-5xl mx-auto">
        <div className="bg-black/60 backdrop-blur-3xl p-20 rounded-[4rem] border border-white/5 shadow-2xl">
          <h2 className="text-[5.5rem] font-black tracking-tighter mb-16 leading-[0.8] italic">
            designing with <br /> purpose & grace.
          </h2>
          <div className="space-y-10 text-2xl text-white/50 leading-relaxed font-medium italic max-w-3xl">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>

          <div className="mt-20 pt-12 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center font-black uppercase text-2xl border border-white/10 shadow-2xl">
                {profile?.full_name ? profile.full_name.charAt(0) : '?'}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2 underline decoration-white/10 underline-offset-4">session active</p>
                <p className="text-lg font-bold tracking-tight text-white/80 uppercase tracking-widest">
                  {profile?.full_name} <span className="text-white/20 font-normal ml-4 font-mono text-xs tracking-tighter italic">[{profile?.email}]</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}