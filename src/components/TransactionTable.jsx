import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import toast from 'react-hot-toast';

const TransactionTable = ({ onEdit }) => {
  const { transactions, deleteTransaction, role } = useFinance();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this transaction?")) {
      deleteTransaction(id);
      toast.error("Transaction deleted!");
    }
  };

  //Filter Logic
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = filterDate ? t.date === filterDate : true;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mt-8 transition-colors">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 whitespace-nowrap">Recent Transactions</h3>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <input
            type="text"
            placeholder="Search category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white w-full sm:w-48 text-sm"
          />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input 
              type="date" 
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white text-sm text-gray-600 dark:text-gray-300 w-full sm:w-auto"
            />
            
            {(filterDate || searchTerm) && (
              <button 
                onClick={() => { setFilterDate(''); setSearchTerm(''); }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium whitespace-nowrap ml-2"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-700">
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium text-right">Amount</th>
              {/*Admin Actions Header */}
              {role === 'admin' && <th className="p-4 font-medium text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="p-4 text-sm text-gray-600 dark:text-gray-300">{t.date}</td>
                  <td className="p-4 text-sm text-gray-800 dark:text-gray-100 font-medium">{t.category}</td>
                  <td className="p-4 text-sm capitalize">
                    <span className={`px-2 py-1 rounded-full text-xs ${t.type === 'income' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`p-4 text-sm font-bold text-right ${t.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-100'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                  </td>
                  
                  {/* Edit/Delete Buttons for Admins */}
                  {role === 'admin' && (
                    <td className="p-4 text-sm text-center space-x-3">
                      <button onClick={() => onEdit(t)} className="text-blue-500 hover:text-blue-700 dark:text-blue-400 font-medium">Edit</button>
                      <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 font-medium">Delete</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                {/* Dynamically adjust colSpan based on role */}
                <td colSpan={role === 'admin' ? "5" : "4"} className="p-12 text-center text-gray-500 dark:text-gray-400">
                  <p className="text-lg mb-1">No transactions found.</p>
                  <p className="text-sm">Try adjusting your date or search term.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;