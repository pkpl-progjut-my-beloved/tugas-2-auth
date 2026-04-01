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
            className="text-xs font-semibold text-[#f85149] hover:text-white hover:bg-[#f85149] border border-[#30363d] px-3 py-1 rounded-md transition-all"
        >
            Sign out
        </button>
    )
}