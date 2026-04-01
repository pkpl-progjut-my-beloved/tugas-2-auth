import './globals.css'
import { Inter, Poppins, Playfair_Display, Montserrat, Syne, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ weight: ['400', '900'], subsets: ['latin'], variable: '--font-poppins' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const syne = Syne({ subsets: ['latin'], variable: '--font-syne' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${montserrat.variable} ${syne.variable} ${space.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}