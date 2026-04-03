import { useFinance } from '../context/FinanceContext';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as PieTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as BarTooltip, Legend
} from 'recharts';

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#64748b'];

const DashboardCharts = () => {
  // 1. Pull the theme from context to conditionally style the SVGs
  const { transactions, theme } = useFinance();

  // Categorical Data: Grouping expenses by category for the Pie Chart
  const expenseData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
      return acc;
    }, [])
    .sort((a, b) => b.value - a.value); 

  // Time-Based Data: Grouping income/expenses by date for the Bar Chart
  const timeData = transactions
    .reduce((acc, curr) => {
      let existing = acc.find((item) => item.date === curr.date);
      if (!existing) {
        existing = { date: curr.date, income: 0, expense: 0 };
        acc.push(existing);
      }
      if (curr.type === 'income') existing.income += curr.amount;
      if (curr.type === 'expense') existing.expense += curr.amount;
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date)); 

  // 2. Dynamic Colors for Recharts based on the current theme
  const axisColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const tooltipBg = theme === 'dark' ? '#1f2937' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#374151' : '#f3f4f6';
  const tooltipText = theme === 'dark' ? '#f3f4f6' : '#1f2937';
  const gridColor = theme === 'dark' ? '#374151' : '#f3f4f6';
  const barHoverCursor = theme === 'dark' ? '#374151' : '#f9fafb';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Time-Based Visualization: Income vs Expense over Time */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Cash Flow Trend</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <BarTooltip 
                cursor={{ fill: barHoverCursor }} 
                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '8px', border: `1px solid ${tooltipBorder}`, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
              />
              <Legend wrapperStyle={{ paddingTop: '10px', color: axisColor }} />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Categorical Visualization: Spending Breakdown */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">Expenses by Category</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <PieTooltip 
                formatter={(value) => `$${value}`} 
                contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '8px', border: `1px solid ${tooltipBorder}`, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
              />
              <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '14px', color: axisColor }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;