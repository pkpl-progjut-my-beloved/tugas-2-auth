import './globals.css'
import { Inter, Poppins, Playfair_Display, Montserrat, Roboto_Mono, Space_Grotesk, Syne } from 'next/font/google'

// load all fonts to be used in the app
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ weight: ['400', '700', '900'], subsets: ['latin'], variable: '--font-poppins' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${montserrat.variable} ${syne.variable} ${space.variable}`}>
      <body>{children}</body>
    </html>
  )
}