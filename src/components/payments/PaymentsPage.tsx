'use client';
import DashboardLayout from '../shared/DashboardLayout';
import { useState, useEffect } from 'react';

export default function PaymentsPage() {
  const [data, setData] = useState([]);
  
  // Here we would fetch from our new API
  // useEffect(() => { fetch('/api/v1/paymentss').then(r => r.json()).then(setData) }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Payments</h1>
          <p className="text-slate-500 text-sm">Manage your payments here.</p>
        </div>
        <button className="btn-primary w-full sm:w-auto">Create New</button>
      </div>
      
      <div className="card p-6">
        <div className="flex items-center justify-center p-12 text-slate-400">
          <p>No payments created yet.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}