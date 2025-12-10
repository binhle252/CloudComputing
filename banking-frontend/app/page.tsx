import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Page() {
  const [summary, setSummary] = useState({ customers: 0, accounts: 0, transactions: 0 })

  useEffect(() => {
    // Try to fetch basic counts from backend services (optional)
    const fetchSummary = async () => {
      try {
        const [c,a,t] = await Promise.all([
          axios.get('http://localhost:3001/customer').catch(()=>({data:[] })),
          axios.get('http://localhost:3002/account').catch(()=>({data:[] })),
          axios.get('http://localhost:3003/transaction').catch(()=>({data:[] })),
        ])
        setSummary({
          customers: (c.data || []).length || 0,
          accounts: (a.data || []).length || 0,
          transactions: (t.data || []).length || 0,
        })
      } catch (err) {
        console.log(err)
      }
    }
    fetchSummary()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Customers</div>
          <div className="text-2xl font-semibold">{summary.customers}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Accounts</div>
          <div className="text-2xl font-semibold">{summary.accounts}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Transactions</div>
          <div className="text-2xl font-semibold">{summary.transactions}</div>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Gợi ý</h3>
        <p className="text-sm text-gray-600">Mở các service backend ở ports 3001(customer), 3002(account), 3003(transaction) để frontend kết nối đầy đủ.</p>
      </div>
    </div>
  )
}
