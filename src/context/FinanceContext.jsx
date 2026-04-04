import { createContext, useState, useContext, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem('finance_transactions');
    return savedData ? JSON.parse(savedData) : initialTransactions;
  });

  const [role, setRole] = useState(() => localStorage.getItem('finance_role') || 'viewer');
  
  const [theme, setTheme] = useState(() => localStorage.getItem('finance_theme') || 'light');

  useEffect(() => { localStorage.setItem('finance_transactions', JSON.stringify(transactions)); }, [transactions]);
  useEffect(() => { localStorage.setItem('finance_role', role); }, [role]);
  
  // Theme Watcher
  useEffect(() => {
    localStorage.setItem('finance_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addTransaction = (newTx) => setTransactions([newTx, ...transactions]);
  
  // Delete and Update Functions
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateTransaction = (updatedTx) => {
    setTransactions(transactions.map(t => t.id === updatedTx.id ? updatedTx : t));
  };

  return (
    <FinanceContext.Provider value={{ 
      transactions, addTransaction, deleteTransaction, updateTransaction, 
      role, setRole, theme, setTheme 
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);