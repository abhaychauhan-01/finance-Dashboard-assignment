import { useState, useEffect } from 'react';
import { useFinance } from '../context/FinanceContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AddTransactionModal = ({ isOpen, onClose, transactionToEdit }) => {
  const { addTransaction, updateTransaction } = useFinance();
  
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '',
    type: 'expense'
  });

  // Agar edit pe click kiya hai, toh purana data form mein bhar do
  useEffect(() => {
    if (transactionToEdit) {
      setFormData(transactionToEdit);
    } else {
      setFormData({ date: '', amount: '', category: '', type: 'expense' });
    }
  }, [transactionToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.amount || !formData.category) return;

    if (transactionToEdit) {
      // UPDATE LOGIC
      updateTransaction({ ...formData, amount: parseFloat(formData.amount) });
      toast.success("Transaction updated!");
    } else {
      // CREATE LOGIC
      addTransaction({
        id: Date.now().toString(),
        date: formData.date,
        amount: parseFloat(formData.amount),
        category: formData.category,
        type: formData.type
      });
      toast.success("Transaction added!");
    }
    
    // Close modal after saving
    setFormData({ date: '', amount: '', category: '', type: 'expense' });
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-100 dark:border-gray-700 transition-colors duration-200"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 font-bold text-xl transition-colors">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. TYPE (Income / Expense) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transaction Type</label>
            <select 
              value={formData.type} 
              onChange={(e) => setFormData({ ...formData, type: e.target.value })} 
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          {/* 2. CATEGORY / NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name / Category</label>
            <input 
              type="text" 
              required 
              placeholder="e.g., Rent, Salary, Groceries" 
              value={formData.category} 
              onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>

          {/* 3. AMOUNT / PRICE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price / Amount ($)</label>
            <input 
              type="number" 
              required 
              min="0.01" 
              step="0.01" 
              placeholder="0.00"
              value={formData.amount} 
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })} 
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* 4. DATE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
            <input 
              type="date" 
              required 
              value={formData.date} 
              onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit" 
            className="w-full bg-purple-500 text-white font-medium py-2 rounded-lg hover:bg-purple-600 active:scale-[0.98] transition-all mt-6"
          >
            {transactionToEdit ? 'Save Changes' : 'Add Transaction'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTransactionModal;