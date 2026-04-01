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
    if (profile?.role === 'VIEWER') redirect('/')

    const { data: allUsers } = await supabase.from('profiles').select('*').order('role', { ascending: false })
    const isSuper = profile?.role === 'SUPER_ADMIN'

    return (
        <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
            <nav className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-4 text-sm">
                    <Link href="/" className="font-bold text-[#58a6ff]">← Back</Link>
                    <span className="text-[#8b949e]">/</span>
                    <span className="font-semibold text-[#f0f6fc]">Users Management</span>
                </div>
                <LogoutButton />
            </nav>

            <div className="max-w-5xl mx-auto pt-10 px-4">
                <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
                    <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-3 text-xs font-bold text-[#8b949e] uppercase tracking-wider">
                        Directory Listing
                    </div>
                    <div className="divide-y divide-[#30363d]">
                        {allUsers?.map((u) => (
                            <div key={u.id} className="flex items-center justify-between px-4 py-4 hover:bg-[#1f242c]">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-md overflow-hidden border border-[#30363d] bg-[#0d1117]">
                                        {u.avatar_url ? (
                                            <img src={u.avatar_url} className="w-full h-full object-cover" alt="" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-bold text-xs">
                                                {u.full_name?.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-[#f0f6fc]">{u.full_name}</span>
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full border border-[#30363d] font-semibold ${u.role === 'SUPER_ADMIN' ? 'text-purple-400' :
                                                u.role === 'ADMIN' ? 'text-blue-400' : 'text-[#8b949e]'
                                                }`}>
                                                {u.role.toLowerCase()}
                                            </span>
                                        </div>
                                        <div className="text-xs text-[#8b949e] font-mono">{u.email}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {isSuper && u.id !== user.id ? (
                                        <>
                                            {u.role !== 'ADMIN' && (
                                                <form action="/api/admin/change-role" method="POST">
                                                    <input type="hidden" name="userId" value={u.id} /><input type="hidden" name="newRole" value="ADMIN" />
                                                    <button className="bg-[#21262d] border border-[#30363d] px-3 py-1 rounded-md text-xs font-semibold text-[#f0f6fc] hover:bg-[#30363d]">Promote</button>
                                                </form>
                                            )}
                                            {u.role !== 'VIEWER' && (
                                                <form action="/api/admin/change-role" method="POST">
                                                    <input type="hidden" name="userId" value={u.id} /><input type="hidden" name="newRole" value="VIEWER" />
                                                    <button className="border border-[#30363d] px-3 py-1 rounded-md text-xs font-semibold text-[#f85149] hover:bg-[#f85149] hover:text-white transition-all">Demote</button>
                                                </form>
                                            )}
                                        </>
                                    ) : (
                                        <span className="text-xs text-[#484f58] italic uppercase tracking-tighter">{u.id === user.id ? 'Self' : ''}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}