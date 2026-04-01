'use client'
import { createClient } from '@/utils/supabase/client'

export default function LoginFormClient() {
    const supabase = createClient()
    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: `${window.location.origin}/auth/callback` }
        })
    }

    return (
        <div className="h-screen bg-[#0d1117] flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[340px] border border-[#30363d] bg-[#161b22] p-10 rounded-lg shadow-2xl text-center">
                <div className="mb-8">
                    <div className="w-16 h-16 bg-[#0d1117] border border-[#30363d] rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
                        🐙
                    </div>
                    <h1 className="text-2xl font-bold text-[#f0f6fc] tracking-tight">Welcome</h1>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-[#238636] hover:bg-[#2ea043] text-white py-2.5 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-md active:scale-95"
                >
                    <img src="https://www.google.com/favicon.ico" className="w-4 h-4 bg-white rounded-full p-0.5" alt="google" />
                    Sign in with Google
                </button>

                <div className="mt-8 pt-6 border-t border-[#30363d]">
                    <p className="text-[10px] text-[#484f58] uppercase tracking-widest font-bold">Secure Authentication</p>
                </div>
            </div>
        </div>
    )
}