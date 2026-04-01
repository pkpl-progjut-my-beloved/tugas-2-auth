'use client'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
    const supabase = createClient()
    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` }
        })
    }

    return (
        <div className="h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <div className="w-full max-w-sm text-center">
                <div className="mb-10">
                    <div className="inline-block p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 mb-8 shadow-2xl">
                        <span className="text-5xl">⚡</span>
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tighter mb-3 italic">progjut portal</h1>
                    <p className="text-gray-500 text-sm font-medium tracking-tight">authenticate to manage global theme settings</p>
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-white text-black py-5 rounded-2xl font-black flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-white/5 uppercase tracking-widest text-xs"
                >
                    <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="google" />
                    sign in with google
                </button>
            </div>
        </div>
    )
}