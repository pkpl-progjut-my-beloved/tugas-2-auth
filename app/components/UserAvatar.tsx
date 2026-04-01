'use client'

import { useState } from 'react'

export default function UserAvatar({ src, name }: { src?: string | null, name?: string | null }) {
    const [isError, setIsError] = useState(false)

    return (
        <div className="w-12 h-12 rounded-md overflow-hidden border border-[#30363d] bg-[#161b22] flex items-center justify-center relative">
            <span className="absolute font-bold text-[#8b949e] uppercase">
                {name?.charAt(0) || '?'}
            </span>

            {src && !isError && (
                <img
                    src={src}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover relative z-10"
                    alt=""
                    onError={() => setIsError(true)}
                />
            )}
        </div>
    )
}