import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import SummaryCards from './components/SummaryCards';
import TransactionTable from './components/TransactionTable';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import AddTransactionModal from './components/AddTransactionModal';
import DashboardCharts from './components/DashboardCharts';

const DashboardLayout = () => {
  // 1. Pull theme and setTheme from Context
  const { role, setRole, theme, setTheme } = useFinance();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // 2. State to track which transaction is being edited
  const [editingTransaction, setEditingTransaction] = useState(null);

  // 3. Handlers for Create vs Edit
  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  return (
    // Added dark mode background to main container
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row transition-colors duration-200">
      
      {/* Sidebar / Top Nav */}
      <nav className="w-full md:w-64 bg-white dark:bg-gray-800 border-b md:border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between transition-colors duration-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">FinanceDash</h1>
          <ul className="space-y-4 text-gray-600 dark:text-gray-400">
            <li 
              onClick={() => setActiveTab('overview')} 
              className={`cursor-pointer transition ${activeTab === 'overview' ? 'font-medium text-purple-600 dark:text-purple-400' : 'hover:text-gray-900 dark:hover:text-white'}`}
            >
              Overview
            </li>
            <li 
              onClick={() => setActiveTab('transaction')} 
              className={`cursor-pointer transition ${activeTab === 'transaction' ? 'font-medium text-purple-600 dark:text-purple-400' : 'hover:text-gray-900 dark:hover:text-white'}`}
            >
              Transactions
            </li>
          </ul>
        </div>
        
        <div>
          {/* THEME TOGGLE BUTTON */}
          <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
             <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="w-full flex items-center justify-center p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
             >
                {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
             </button>
          </div>

          {/* Role Toggle */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current Role:</p>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white border-none rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white capitalize">
            {activeTab === 'transaction' ? 'Transactions' : activeTab}
          </h2>
          
          {role === 'admin' && (
            // Swapped inline state for handleCreateClick
            <button 
              onClick={handleCreateClick} 
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
            >
              + Add Transaction
            </button>
          )}
        </header>

        {/* CONDITIONAL RENDERING LOGIC */}
        {activeTab === 'overview' ? (
          <>
            <SummaryCards />
            <DashboardCharts />
            {/* Pass onEdit down to the table */}
            <TransactionTable onEdit={handleEditClick} />
          </>
        ) : (
          
          <TransactionTable onEdit={handleEditClick} />
        )}
        
        {/* Pass transactionToEdit down to the Modal */}
        <AddTransactionModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          transactionToEdit={editingTransaction}
        />
      </main>
    </div>
  );
};

function App() {
  return (
    <FinanceProvider>
      <Toaster position='bottom-right' toastOptions={{ duration: 3000 }} />
      <DashboardLayout />
    </FinanceProvider>
  );
}

export default App;