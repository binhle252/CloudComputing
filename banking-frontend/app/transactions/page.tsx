'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Tx = { _id?: string, from?: string, to?: string, amount?: number }

export default function TransactionsPage() {
  const [txs, setTxs] = useState<Tx[]>([])
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState<number>(0)

  const fetchTx = async () => {
    try {
      const res = await axios.get('http://localhost:3003/transaction')
      setTxs(res.data || [])
    } catch (err) {
      console.error(err)
      setTxs([])
    }
  }

  useEffect(()=>{ fetchTx() }, [])

  const createTx = async () => {
    if (!from || !to || amount <= 0) return
    await axios.post('http://localhost:3003/transaction', { from, to, amount })
    setFrom(''); setTo(''); setAmount(0)
    fetchTx()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>

      <div className="mb-4 grid grid-cols-4 gap-2">
        <input value={from} onChange={(e)=>setFrom(e.target.value)} className="border px-3 py-2 rounded" placeholder="From accountId" />
        <input value={to} onChange={(e)=>setTo(e.target.value)} className="border px-3 py-2 rounded" placeholder="To accountId" />
        <input type="number" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className="border px-3 py-2 rounded" placeholder="Amount" />
        <button onClick={createTx} className="bg-blue-600 text-white px-4 py-2 rounded">Gửi</button>
      </div>

      <ul className="space-y-2">
        {txs.map(t => (
          <li key={t._id || Math.random()} className="p-3 bg-white rounded shadow">
            {t.from} → {t.to} : {t.amount}
          </li>
        ))}
      </ul>
    </div>
  )
}
