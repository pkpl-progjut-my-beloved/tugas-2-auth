'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ThemeForm({ initialSettings }: { initialSettings: any }) {
    const [color, setColor] = useState(initialSettings.primary_color)
    const [font, setFont] = useState(initialSettings.font_family)

    const fontOptions = [
        { name: 'Inter', val: 'var(--font-inter)' },
        { name: 'Poppins', val: 'var(--font-poppins)' },
        { name: 'Playfair Display', val: 'var(--font-playfair)' },
        { name: 'Montserrat', val: 'var(--font-montserrat)' },
        { name: 'Syne', val: 'var(--font-syne)' },
        { name: 'Space Grotesk', val: 'var(--font-space)' },
    ]

    return (
        <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col lg:flex-row transition-all duration-300 font-sans">
            <div className="w-full lg:w-[380px] bg-[#161b22] border-r border-[#30363d] p-10 flex flex-col h-screen overflow-y-auto">
                <Link href="/" className="text-sm font-bold text-[#58a6ff] hover:underline mb-10 flex items-center gap-2 transition-all">
                    ← Back to dashboard
                </Link>
                <h1 className="text-2xl font-bold text-[#f0f6fc] mb-1 tracking-tight">MANUSIA HITAM</h1>
                <p className="text-sm text-[#8b949e] mb-12 border-b border-[#30363d] pb-4 font-medium">Appearance settings</p>

                <form action="/api/settings/update" method="POST" className="space-y-10">
                    <div>
                        <label className="block text-sm font-bold text-[#f0f6fc] mb-3">Accent color</label>
                        <div className="flex items-center gap-4 bg-[#0d1117] p-3 border border-[#30363d] rounded-md focus-within:border-[#58a6ff] transition-all">
                            <input
                                type="color"
                                name="primary_color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-10 h-10 bg-transparent cursor-pointer border-none"
                            />
                            <span className="font-mono text-sm text-[#c9d1d9] font-medium">{color.toUpperCase()}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-[#f0f6fc] mb-3">Typography system</label>
                        <select
                            name="font_family"
                            value={font}
                            onChange={(e) => setFont(e.target.value)}
                            className="w-full bg-[#0d1117] border border-[#30363d] p-3 rounded-md font-medium text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff] transition-all cursor-pointer appearance-none shadow-sm"
                        >
                            {fontOptions.map(f => (
                                <option key={f.name} value={f.val} className="bg-[#161b22]">{f.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-[#238636] hover:bg-[#2ea043] text-white py-2.5 rounded-md font-bold text-sm shadow-md transition-all active:scale-[0.98]">
                        Save changes
                    </button>
                </form>
            </div>

            <div className="flex-1 flex items-center justify-center p-12 transition-all duration-500" style={{ backgroundColor: `${color}05` }}>
                <div className="max-w-2xl w-full bg-[#0d1117] border border-[#30363d] p-16 rounded-md shadow-sm relative transition-all" style={{ fontFamily: font }}>
                    <div className="absolute top-0 left-0 w-full h-[3px]" style={{ backgroundColor: color }} />
                    <h2 className="text-4xl font-bold text-[#f0f6fc] mb-6 tracking-tight text-left leading-tight">
                        Designing with purpose & grace.
                    </h2>
                    <div className="space-y-4 text-[#8b949e] text-lg leading-relaxed border-l-2 border-[#30363d] pl-6 text-left font-medium opacity-80">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}