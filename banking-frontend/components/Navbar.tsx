import Link from 'next/link'
export default function Navbar(){
  return (
    <nav className="flex gap-4">
      <Link href="/">Dashboard</Link>
      <Link href="/customers">Customers</Link>
      <Link href="/accounts">Accounts</Link>
      <Link href="/transactions">Transactions</Link>
    </nav>
  )
}
