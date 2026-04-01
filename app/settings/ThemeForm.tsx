'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ThemeForm({ initialSettings }: { initialSettings: any }) {
    const [color, setColor] = useState(initialSettings.primary_color)
    const [font, setFont] = useState(initialSettings.font_family)

    // expanded font options with different vibes
    const fontOptions = [
        { name: 'Inter', class: 'var(--font-inter)' },
        { name: 'Poppins', class: 'var(--font-poppins)' },
        { name: 'Playfair Display', class: 'var(--font-playfair)' },
        { name: 'Montserrat', class: 'var(--font-montserrat)' },
        { name: 'Syne', class: 'var(--font-syne)' },
        { name: 'Space Grotesk', class: 'var(--font-space)' },
    ]

    return (
        <div className="min-h-screen flex flex-col lg:flex-row transition-all duration-700" style={{ backgroundColor: color }}>
            {/* settings panel with softer glassmorphism */}
            <div className="w-full lg:w-[450px] bg-[#050505]/80 backdrop-blur-3xl p-12 lg:h-screen flex flex-col justify-center border-r border-white/5 text-white z-20">
                <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all mb-10 block">← cancel</Link>
                <h1 className="text-5xl font-black mb-2 tracking-tighter italic italic">AETHER</h1>
                <p className="text-gray-500 mb-12 text-sm font-medium">refine the visual essence of your portal</p>

                <form action="/api/settings/update" method="POST" className="space-y-10">
                    <div>
                        <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] mb-4 block">canvas accent</label>
                        <div className="flex items-center gap-6 bg-white/[0.03] p-5 rounded-2xl border border-white/5 focus-within:border-white/20 transition-all">
                            <input
                                type="color"
                                name="primary_color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-14 h-14 bg-transparent cursor-pointer rounded-xl border-none outline-none"
                            />
                            <span className="font-mono text-lg font-bold text-white/60 tracking-tighter">{color.toUpperCase()}</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] mb-4 block">typography selection</label>
                        <select
                            name="font_family"
                            value={font}
                            onChange={(e) => setFont(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/5 p-5 rounded-2xl font-bold text-lg focus:outline-none focus:border-white/20 transition-all cursor-pointer appearance-none"
                        >
                            {fontOptions.map(f => (
                                <option key={f.name} value={f.class} className="bg-[#0a0a0a] text-white">
                                    {f.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-white text-black py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all mt-4">
                        save configuration
                    </button>
                </form>
            </div>

            {/* improved live preview with darker overlay for eye comfort */}
            <div className="flex-1 flex items-center justify-center p-12 relative">
                <div className="absolute inset-0 bg-black/40 pointer-events-none" /> {/* extra darkening layer for eye safety */}
                <div
                    className="max-w-2xl w-full bg-black/60 backdrop-blur-2xl p-20 rounded-[4rem] border border-white/10 shadow-2xl text-white relative z-10 transition-all duration-500"
                    style={{ fontFamily: font }}
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-12 text-center">— visual simulation —</p>
                    <h2 className="text-6xl font-black tracking-tighter mb-10 leading-[0.85] italic">
                        the quick brown fox jumps over the lazy dog.
                    </h2>
                    <div className="space-y-8 opacity-40 text-xl leading-relaxed italic font-medium">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}