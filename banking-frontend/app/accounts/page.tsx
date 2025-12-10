'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Account = { _id?: string, ownerId?: string, balance?: number }

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [ownerId, setOwnerId] = useState('')
  const [balance, setBalance] = useState(0)

  const fetchAccounts = async () => {
    try {
      const res = await axios.get('http://localhost:3002/account')
      setAccounts(res.data || [])
    } catch (err) {
      console.error(err)
      setAccounts([])
    }
  }

  useEffect(()=>{ fetchAccounts() }, [])

  const createAccount = async () => {
    if (!ownerId) return
    await axios.post('http://localhost:3002/account', { ownerId, balance })
    setOwnerId(''); setBalance(0)
    fetchAccounts()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Accounts</h2>

      <div className="mb-4 grid grid-cols-3 gap-2">
        <input value={ownerId} onChange={(e)=>setOwnerId(e.target.value)} className="border px-3 py-2 rounded" placeholder="Owner ID (customer._id)" />
        <input type="number" value={balance} onChange={(e)=>setBalance(Number(e.target.value))} className="border px-3 py-2 rounded" placeholder="Số dư ban đầu" />
        <button onClick={createAccount} className="bg-blue-600 text-white px-4 py-2 rounded">Tạo</button>
      </div>

      <ul className="space-y-2">
        {accounts.map(a => (
          <li key={a._id || Math.random()} className="p-3 bg-white rounded shadow">
            Owner: {a.ownerId} — Balance: {a.balance ?? 0}
          </li>
        ))}
      </ul>
    </div>
  )
}
