import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import LogoutButton from '@/app/components/LogoutButton'
import Link from 'next/link'
import UserAvatar from '@/app/components/UserAvatar'

export default async function HomePage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = user ? await supabase.from('profiles').select('*').eq('id', user.id).single() : { data: null }
  const { data: settings } = await supabase.from('web_settings').select('*').single()

  const isAdmin = profile?.role === 'SUPER_ADMIN' || profile?.role === 'ADMIN'

  const teamMembers = [
    { no: 1, nama: "Bermulya Anugrah Putra", npm: "2406347424" },
    { no: 2, nama: "Rafsanjani", npm: "2406495400" },
    { no: 3, nama: "Farrel Rifqi Bagaskoro", npm: "2406406780" },
    { no: 4, nama: "Muhammad Lanang Z. H.", npm: "2406362860" },
  ]

  const getRoleStyle = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'text-purple-400 border-purple-400/30 bg-purple-400/5'
      case 'ADMIN': return 'text-blue-400 border-blue-400/30 bg-blue-400/5'
      default: return 'text-[#8b949e] border-[#30363d] bg-[#161b22]'
    }
  }

  return (
    <div
      className="min-h-screen text-[#c9d1d9] transition-all duration-700 font-sans"
      style={{
        backgroundColor: '#0d1117',
        backgroundImage: `radial-gradient(circle at top, ${settings?.primary_color || '#58a6ff'}10, #0d1117)`,
      }}
    >
      <nav className="bg-[#161b22] border-b border-[#30363d] py-3 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center text-sm font-medium">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#f0f6fc]">OAuth</span>
          </div>
          <div className="flex gap-6 items-center">
            {user ? (
              <>
                {isAdmin && (
                  <>
                    <Link href="/admin" className="text-[#8b949e] hover:text-[#58a6ff] transition-all font-bold">Admin Panel</Link>
                    <Link href="/settings" className="bg-[#21262d] border border-[#30363d] px-3 py-1.5 rounded-md hover:bg-[#30363d] text-[#f0f6fc] transition-all font-bold">
                      Edit page
                    </Link>
                  </>
                )}
                <LogoutButton />
              </>
            ) : (
              <Link href="/login" className="bg-[#238636] hover:bg-[#2ea043] text-white px-5 py-1.5 rounded-md font-bold transition-all shadow-md">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-[1200px] mx-auto pt-16 pb-20 px-8" style={{ fontFamily: settings?.font_family || 'var(--font-inter)' }}>
        <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-10 mb-10 shadow-sm relative overflow-hidden text-left" style={{ borderLeft: `6px solid ${settings?.primary_color || '#30363d'}` }}>
          <h2 className="text-4xl font-bold text-[#f0f6fc] mb-6 tracking-tight">
            Designing with purpose & grace.
          </h2>
          <div className="max-w-3xl space-y-4 text-[#8b949e] text-lg leading-relaxed font-medium">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>

          {user && (
            <div className="mt-12 pt-8 border-t border-[#30363d] flex items-center gap-4">
              <UserAvatar src={profile?.avatar_url} name={profile?.full_name} />
              <div>
                <div className="flex items-center gap-2 mb-0.5 text-left">
                  <p className="font-bold text-[#f0f6fc] leading-none">{profile?.full_name}</p>
                  <span className={`text-[9px] border px-1.5 py-0.5 rounded font-bold uppercase ${getRoleStyle(profile?.role)}`}>
                    {profile?.role}
                  </span>
                </div>
                <p className="text-xs text-[#8b949e] font-medium text-left">Authenticated session</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-bold text-[#f0f6fc] uppercase tracking-wider">Kelompok</h3>
          </div>

          <div className="bg-[#0d1117] border border-[#30363d] rounded-md overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#161b22] text-[#8b949e] text-xs font-bold uppercase tracking-widest border-b border-[#30363d]">
                  <th className="px-6 py-3 w-16">No</th>
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">NPM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#30363d]">
                {teamMembers.map((member) => (
                  <tr key={member.no} className="hover:bg-[#161b22]/50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-mono text-[#484f58] group-hover:text-[#8b949e]">
                      {member.no.toString().padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#c9d1d9]">
                      {member.nama}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-[#58a6ff]">
                      {member.npm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[11px] text-[#484f58] italic uppercase tracking-widest text-left">
            made with ❤️ by Progjut my beloved - {new Date().getFullYear()}
          </p>
        </div>
      </main>
    </div>
  )
}