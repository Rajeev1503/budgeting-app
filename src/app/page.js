"use client";
import { useState, useEffect, useMemo } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import axios from "axios";
import PieChartComponent from "@/components/pieChartComponent";
import BarChartComponent from "@/components/barChartComponent";
import TransactionsList from "@/components/transactionsList";
import FilterPanel from "@/components/filterPanel";
import ExpenseModal from "@/components/expenseModal";
import Spinner from "@/components/ui/spinner";
import formatDate from "@/utils/dateFormater";
import generatePastelColor from "@/utils/pastelColorGenerator";
import generatePunchyColorHex from "@/utils/pastelColorGenerator";

const Home = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [userData, SetUserData] = useState(null);
  const [userExpenses, setUserExpenses] = useState(null);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await axios.get("/api/getexpenses");
      SetUserData(response.data.userData);
      setUserExpenses(response.data.userExpenses);
    };
    fetchExpenses();
  }, []);

  const filteredExpenses = [];

  const pieChartData = [34980, 34980, 34980]; // Replace with real data
  const barChartDataGenerator = useMemo(() => {
    const colorsUsed = [];
    const dataset = {};
    userExpenses?.forEach((expense) => {
      if (!dataset[expense.category]) {
        let generatedColor;
        do {
          generatedColor = generatePunchyColorHex();
        } while (colorsUsed.includes(generatedColor));
        colorsUsed.push(generatedColor);

        dataset[expense.category] = {
          label: expense.category,
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: generatedColor,
        };
      }
      // Push the expense amount to the data array
      const today = new Date();
      const expenseDate = new Date(expense.date);
      const datasetDateLen = dataset[expense.category].data.length-1
      const days = today.getDate() - expenseDate.getDate();
      if (dataset[expense.category].data[datasetDateLen - days] !== 0) {
        dataset[expense.category].data[datasetDateLen - days] += expense.amount;
      }
      dataset[expense.category].data.splice(datasetDateLen - days,1, expense.amount);
      // if(expenseDate)
    });
    const datasetArray = Object.values(dataset);
    console.log("dataset========", datasetArray);
    return datasetArray.reverse();
  }, [userExpenses]);

  return (
    <>
      <div className="container h-[100%] w-[100%] mx-auto p-4 box-border">
        <header className="mb-4 h-[4%] flex justify-around items-center">
          <h1 className="text-2xl font-bold">BUDGETT</h1>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main className="w-[100%] m-auto h-[96%] flex flex-row gap-4">
          <section className="w-full flex flex-row gap-4">
            <div className="w-[70%] h-full flex flex-col gap-4 overflow-y-scroll">
              <div className="h-auto shadow-lg border pie-chart bg-white p-4 rounded-3xl">
                <h2 className=" text-xl font-bold mb-4">This month</h2>
                <div className="px-8">
                  {!userData ? (
                    <Spinner />
                  ) : (
                    <PieChartComponent
                      className="w-[50px]"
                      data={pieChartData}
                    />
                  )}
                </div>
              </div>
              <div className="bar-chart bg-white p-4 border shadow-lg rounded-3xl mb-8">
                <h2 className="text-xl font-bold mb-4">Last week</h2>
                <div className="w-full px-8">
                  {!userData ? (
                    <Spinner />
                  ) : (
                    <BarChartComponent
                      className="w-full"
                      dataGenerator={barChartDataGenerator}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-[30%] bg-white p-8 shadow-lg border rounded-3xl mb-8">
              <TransactionsList
                transactions={filteredExpenses}
                userData={userData}
                userExpenses={userExpenses}
              />
            </div>
          </section>
        </main>
      </div>
      <button
        className="fixed bottom-6 right-[34rem] !p-0 !m-0 h-12 w-12 bg-blue-600 rounded-full"
        onClick={() => setShowAddExpenseModal(true)}
      >
        <p className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] text-4xl text-white antialiased">
          +
        </p>
      </button>
      {showAddExpenseModal && (
        <ExpenseModal
          userData={userData}
          setShowAddExpenseModal={setShowAddExpenseModal}
        />
      )}
    </>
  );
};

export default Home;
