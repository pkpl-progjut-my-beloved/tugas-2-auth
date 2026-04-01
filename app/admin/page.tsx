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
        <div className="min-h-screen bg-[#060606] text-gray-100 p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all mb-4 block">← return to home</Link>
                        <h1 className="text-5xl font-black tracking-tighter italic">user management</h1>
                    </div>
                    <LogoutButton />
                </div>

                <div className="bg-[#0f0f0f] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-gray-500 font-black border-b border-white/5">
                            <tr>
                                <th className="px-10 py-6">identity info</th>
                                <th className="px-10 py-6 text-center">access level</th>
                                <th className="px-10 py-6 text-right font-black italic">{isSuper ? 'privileged actions' : 'read only access'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {allUsers?.map((u) => (
                                <tr key={u.id} className="group hover:bg-white/[0.01] transition-all">
                                    <td className="px-10 py-8">
                                        <div className="font-bold text-white text-lg tracking-tight">{u.full_name}</div>
                                        <div className="text-sm text-gray-500 font-mono tracking-tighter">{u.email}</div>
                                    </td>
                                    <td className="px-10 py-8 text-center">
                                        <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${u.role === 'SUPER_ADMIN' ? 'border-purple-500/50 text-purple-400 bg-purple-500/10' :
                                            u.role === 'ADMIN' ? 'border-blue-500/50 text-blue-400 bg-blue-500/10' : 'border-white/10 text-gray-500'
                                            }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        {isSuper && u.id !== user.id ? (
                                            <div className="flex justify-end gap-3">
                                                {u.role !== 'ADMIN' && (
                                                    <form action="/api/admin/change-role" method="POST">
                                                        <input type="hidden" name="userId" value={u.id} /><input type="hidden" name="newRole" value="ADMIN" />
                                                        <button className="text-[10px] uppercase tracking-widest bg-white text-black px-5 py-2.5 rounded-xl font-black hover:scale-105 transition-all">promote to admin</button>
                                                    </form>
                                                )}
                                                {u.role !== 'VIEWER' && (
                                                    <form action="/api/admin/change-role" method="POST">
                                                        <input type="hidden" name="userId" value={u.id} /><input type="hidden" name="newRole" value="VIEWER" />
                                                        <button className="text-[10px] uppercase tracking-widest border border-red-500/30 text-red-500 px-5 py-2.5 rounded-xl font-black hover:bg-red-500/10 transition-all">demote</button>
                                                    </form>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700">{u.id === user.id ? 'current session' : 'restricted'}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}