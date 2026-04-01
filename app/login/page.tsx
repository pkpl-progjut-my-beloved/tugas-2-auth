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
        <div className="h-screen bg-[#0d1117] flex items-center justify-center p-4">
            <div className="w-full max-w-[340px] border border-[#30363d] bg-[#161b22] p-8 rounded-lg shadow-xl text-center">
                <div className="mb-6">
                    <span className="text-4xl">🐙</span>
                    <h1 className="text-2xl font-semibold text-[#f0f6fc] mt-4 tracking-tight">Welcome</h1>
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-[#238636] hover:bg-[#2ea043] text-white py-2.5 rounded-md font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-md"
                >
                    <img src="https://www.google.com/favicon.ico" className="w-4 h-4 bg-white rounded-full p-0.5" alt="google" />
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}