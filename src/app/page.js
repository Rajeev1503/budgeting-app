'use client'
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import PieChartComponent from '@/components/pieChartComponent';
import BarChartComponent from '@/components/barChartComponent';
import TransactionsList from '@/components/transactionsList';
import FilterPanel from '@/components/filterPanel';

const Home = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    Food: true,
    Housing: true,
    Utilities: true,
    Healthcare: true,
  });

  useEffect(() => {
    const fetchExpenses = async () => {
      // const token = await getToken({ template: 'default' });
      const response = await axios.get('/api/getexpenses'
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      // }
    );
      setExpenses(response.data.data);
    };

    if (isLoaded && userId) {
      fetchExpenses();
    }
  }, [isLoaded, userId, getToken]);

  const filteredExpenses = expenses.filter((expense) => {
    if (filters[expense.category]) return true;
    return false;
  });

  const pieChartData = [34980, 34980, 34980]; // Replace with real data
  const barChartData = {
    essentials: [900, 600, 800, 900, 900, 0, 900], // Replace with real data
    nonEssentials: [0, 119, 0, 0, 0, 0, 0], // Replace with real data
    miscellaneous: [800, 1000, 800, 780, 880, 0, 800], // Replace with real data
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">BUDGETT</h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <section className="md:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="pie-chart bg-white p-4 shadow rounded">
              <h2 className="text-xl font-bold mb-4">This month</h2>
              <PieChartComponent data={pieChartData} />
            </div>
            <div className="bar-chart bg-white p-4 shadow rounded">
              <h2 className="text-xl font-bold mb-4">Last week</h2>
              <BarChartComponent data={barChartData} />
            </div>
          </div>
        </section>
        <section className="md:col-span-1 bg-white p-4 shadow rounded">
          <h2 className="text-xl font-bold mb-4">Transactions</h2>
          <TransactionsList transactions={filteredExpenses} />
        </section>
        <section className="md:col-span-1 bg-white p-4 shadow rounded">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </section>
      </main>
    </div>
  );
};

export default Home;