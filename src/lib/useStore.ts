'use client';
import { useState, useEffect } from 'react';
import { Invoice, Client, Expense } from '@/types';

export function useStore() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedInvoices = localStorage.getItem('ib_invoices');
    const savedClients = localStorage.getItem('ib_clients');
    const savedExpenses = localStorage.getItem('ib_expenses');

    if (savedInvoices) setInvoices(JSON.parse(savedInvoices));
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      // Add default dummy clients
      const defaultClients = [
        { id: 'c1', name: 'Acme Corp', email: 'billing@acmecorp.com', address: '123 Business Rd, NY', phone: '', createdAt: new Date().toISOString() },
        { id: 'c2', name: 'Globex Inc', email: 'accounts@globex.com', address: '456 Tech Ave, SF', phone: '', createdAt: new Date().toISOString() },
        { id: 'c3', name: 'Stark Industries', email: 'tony@stark.com', address: '10880 Malibu Point, CA', phone: '', createdAt: new Date().toISOString() },
        { id: 'c4', name: 'Wayne Enterprises', email: 'finance@wayne.com', address: '1007 Mountain Drive, Gotham', phone: '', createdAt: new Date().toISOString() },
        { id: 'c5', name: 'Cyberdyne Systems', email: 'skynet@cyberdyne.com', address: '18144 El Camino Real, CA', phone: '', createdAt: new Date().toISOString() },
        { id: 'c6', name: 'Initech', email: 'tps@initech.com', address: '4120 Freidrich Ln, TX', phone: '', createdAt: new Date().toISOString() },
        { id: 'c7', name: 'Dunder Mifflin', email: 'sales@dundermifflin.com', address: '1725 Slough Ave, PA', phone: '', createdAt: new Date().toISOString() },
        { id: 'c8', name: 'Soylent Corp', email: 'hr@soylent.com', address: 'New York City, NY', phone: '', createdAt: new Date().toISOString() },
        { id: 'c9', name: 'Massive Dynamic', email: 'info@massivedynamic.com', address: '655 15th St, DC', phone: '', createdAt: new Date().toISOString() },
        { id: 'c10', name: 'Los Pollos Hermanos', email: 'gustavo@lospollos.com', address: '12000 Albuquerque, NM', phone: '', createdAt: new Date().toISOString() },
      ];
      setClients(defaultClients);
      localStorage.setItem('ib_clients', JSON.stringify(defaultClients));
    }
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    
    setIsLoaded(true);
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const addInvoice = (invoice: Invoice) => {
    const newInvoices = [...invoices, invoice];
    setInvoices(newInvoices);
    saveToStorage('ib_invoices', newInvoices);
  };

  const updateInvoice = (updatedInvoice: Invoice) => {
    const newInvoices = invoices.map(inv => inv.id === updatedInvoice.id ? updatedInvoice : inv);
    setInvoices(newInvoices);
    saveToStorage('ib_invoices', newInvoices);
  };

  const deleteInvoice = (id: string) => {
    const newInvoices = invoices.filter(inv => inv.id !== id);
    setInvoices(newInvoices);
    saveToStorage('ib_invoices', newInvoices);
  };

  const addClient = (client: Client) => {
    const newClients = [...clients, client];
    setClients(newClients);
    saveToStorage('ib_clients', newClients);
  };

  const updateClient = (updatedClient: Client) => {
    const newClients = clients.map(c => c.id === updatedClient.id ? updatedClient : c);
    setClients(newClients);
    saveToStorage('ib_clients', newClients);
  };

  const deleteClient = (id: string) => {
    const newClients = clients.filter(c => c.id !== id);
    setClients(newClients);
    saveToStorage('ib_clients', newClients);
  };

  const addExpense = (expense: Expense) => {
    const newExpenses = [...expenses, expense];
    setExpenses(newExpenses);
    saveToStorage('ib_expenses', newExpenses);
  };

  const deleteExpense = (id: string) => {
    const newExpenses = expenses.filter(e => e.id !== id);
    setExpenses(newExpenses);
    saveToStorage('ib_expenses', newExpenses);
  };

  return {
    invoices,
    clients,
    expenses,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    addClient,
    updateClient,
    deleteClient,
    addExpense,
    deleteExpense,
    isLoaded
  };
}
