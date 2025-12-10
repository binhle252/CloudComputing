'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Customer = { _id?: string, name: string }

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [name, setName] = useState('')

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/customer')
      setCustomers(res.data || [])
    } catch (err) {
      console.error(err)
      setCustomers([])
    }
  }

  useEffect(() => { fetchCustomers() }, [])

  const createCustomer = async () => {
    if (!name) return
    await axios.post('http://localhost:3001/customer', { name })
    setName('')
    fetchCustomers()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Customers</h2>
      <div className="mb-4 flex gap-2">
        <input value={name} onChange={(e)=>setName(e.target.value)} className="border px-3 py-2 rounded flex-1" placeholder="Tên khách hàng" />
        <button onClick={createCustomer} className="bg-blue-600 text-white px-4 py-2 rounded">Thêm</button>
      </div>

      <ul className="space-y-2">
        {customers.map(c => (
          <li key={c._id || c.name} className="p-3 bg-white rounded shadow">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
