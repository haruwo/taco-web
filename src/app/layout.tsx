import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'ギア比タコメーターアプリ',
    description: 'ギア比からエンジン回転数と速度を計算するアプリケーション',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ja">
            <body className={inter.className}>{children}</body>
        </html>
    )
} 