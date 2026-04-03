import { useFinance } from '../context/FinanceContext';

const SummaryCards = () => {
  const { transactions } = useFinance();

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Balance Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Balance</h3>
        <p className={`text-3xl font-bold ${balance >= 0 ? 'text-gray-800 dark:text-white' : 'text-red-600 dark:text-red-400'}`}>
          ${balance.toLocaleString()}
        </p>
      </div>

      {/* Income Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Income</h3>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">
          +${income.toLocaleString()}
        </p>
      </div>

      {/* Expenses Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Expenses</h3>
        <p className="text-3xl font-bold text-red-500 dark:text-red-400">
          -${expenses.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default SummaryCards;