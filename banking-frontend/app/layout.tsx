import './globals.css'
import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Banking Frontend',
  description: 'Simple Next.js frontend for Banking Microservices',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Banking Demo</h1>
            <nav className="space-x-4">
              <Link href='/' className="hover:underline">Dashboard</Link>
              <Link href='/customers' className="hover:underline">Customers</Link>
              <Link href='/accounts' className="hover:underline">Accounts</Link>
              <Link href='/transactions' className="hover:underline">Transactions</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
