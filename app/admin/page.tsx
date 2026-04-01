import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LogoutButton from '@/app/components/LogoutButton'
import Link from 'next/link'

export default async function AdminPage() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()

    // block viewers from accessing this page
    if (profile?.role === 'VIEWER') redirect('/')

    const { data: allUsers } = await supabase.from('profiles').select('*').order('role', { ascending: false })

    // pastikan check ini bener
    const isSuper = profile?.role === 'SUPER_ADMIN'

    return (
        <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans">
            <nav className="bg-[#161b22] border-b border-[#30363d] py-3 sticky top-0 z-50 font-medium">
                <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-[#58a6ff] hover:underline">← Back</Link>
                        <span className="text-[#30363d]">/</span>
                        <span className="font-bold text-[#f0f6fc]">User Management</span>
                    </div>
                    <LogoutButton />
                </div>
            </nav>

            <main className="max-w-[1200px] mx-auto pt-12 px-8">
                <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden shadow-sm">
                    <div className="bg-[#1c2128] border-b border-[#30363d] px-6 py-4">
                        <h2 className="text-sm font-bold text-[#f0f6fc]">Team Members ({allUsers?.length})</h2>
                    </div>

                    <div className="divide-y divide-[#30363d]">
                        {allUsers?.map((u) => (
                            <div key={u.id} className="flex items-center justify-between px-6 py-5 hover:bg-[#1f242c] transition-colors">
                                <div className="flex items-center gap-4">
                                    {/* avatar logic */}
                                    <div className="w-10 h-10 rounded-md overflow-hidden border border-[#30363d] bg-[#0d1117]">
                                        {u.avatar_url && !u.avatar_url.endsWith('/0') ? (
                                            <img src={u.avatar_url} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-bold text-xs text-[#8b949e]">
                                                {u.full_name?.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[#f0f6fc]">{u.full_name}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border border-[#30363d] font-bold ${u.role === 'SUPER_ADMIN' ? 'text-purple-400 bg-purple-400/5' :
                                                u.role === 'ADMIN' ? 'text-blue-400 bg-blue-400/5' : 'text-[#8b949e]'
                                                }`}>
                                                {u.role.toLowerCase()}
                                            </span>
                                        </div>
                                        <div className="text-xs text-[#8b949e] font-mono mt-0.5">{u.email}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {/* logic buttons buat super_admin */}
                                    {isSuper && u.id !== user.id ? (
                                        <div className="flex gap-2">
                                            {u.role !== 'ADMIN' && (
                                                <form action="/api/admin/change-role" method="POST">
                                                    <input type="hidden" name="userId" value={u.id} />
                                                    <input type="hidden" name="newRole" value="ADMIN" />
                                                    <button className="bg-[#21262d] border border-[#30363d] px-3 py-1.5 rounded-md text-xs font-bold text-[#c9d1d9] hover:bg-[#30363d] hover:border-[#8b949e] transition-all">
                                                        Make admin
                                                    </button>
                                                </form>
                                            )}
                                            {u.role !== 'VIEWER' && (
                                                <form action="/api/admin/change-role" method="POST">
                                                    <input type="hidden" name="userId" value={u.id} />
                                                    <input type="hidden" name="newRole" value="VIEWER" />
                                                    <button className="border border-[#30363d] px-3 py-1.5 rounded-md text-xs font-bold text-[#f85149] hover:bg-[#f85149] hover:text-white transition-all">
                                                        Demote
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    ) : (
                                        u.id === user.id && (
                                            <span className="text-[10px] font-bold text-[#484f58] uppercase tracking-widest">Self</span>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}