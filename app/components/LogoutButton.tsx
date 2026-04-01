'use client'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.refresh()
        router.push('/login')
    }

    return (
        <button
            onClick={handleLogout}
            className="text-red-500/60 hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-all"
        >
            logout
        </button>
    )
}