import categories from "@/app/api/controllers/utils/category";
import formatDate from "@/utils/dateFormater";
import { useEffect, useMemo, useState } from "react";
import Spinner from "./ui/spinner";
import Image from "next/image";

const TransactionsList = ({ userData, transactions, userExpenses }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [subcategories, setSubcategories] = useState([]);
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [showCategorySelector, setShowCategorySelector] = useState(false);

  const subcategoriesMemo = useMemo(() => {
    const allSubcategories =
      userData?.categories?.flatMap((category) =>
        category.subcategories.map((subcategory) => subcategory)
      ) || [];
    setSubcategories(allSubcategories);
    return allSubcategories;
  }, [userData]);

  useEffect(() => {
    if (selectedCategory == "all") {
      setSubcategories(subcategoriesMemo);
    }
    if (selectedCategory) {
      const categoryObj = userData?.categories.find(
        (cat) => cat.category === selectedCategory
      );
      if (categoryObj) {
        setSubcategories(categoryObj.subcategories);
      }
    }
  }, [subcategoriesMemo, selectedCategory, userData]);

  const groupedTransactions = userExpenses?.reduce((acc, transaction) => {
    const date = transaction.date.split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});

  console.log("groupped=== ", groupedTransactions);

  return (
    <div className="h-full overflow-y-scroll">
      <div className="flex flex-row justify-between items-center pb-4">
        <h2 className="text-xl font-bold">Transactions</h2>
        <div className="relative">
          <div
            className="flex flex-row gap-6 items-center cursor-pointer border border-blue-600 text-xs font-semibold p-1 px-2 rounded-lg capitalize"
            onClick={() => setShowCategorySelector(!showCategorySelector)}
          >
            <span>{selectedCategory}</span>
            <span>
              <Image src={"/down-arrow.svg"} height={12} width={12} />
            </span>
          </div>
          {showCategorySelector && (
            <div className="bg-white text-black p-2 border border-blue-600 rounded-lg mt-2 text-xs font-semibold absolute right-0 flex flex-col gap-0 capitalize">
              {[{ category: "all" }, ...userData?.categories].map(
                (category, i) => {
                  return (
                    <div
                      key={i}
                      value={category.category}
                      className=" hover:bg-blue-600 hover:text-white p-2 px-4 rounded-lg cursor-pointer whitespace-nowrap"
                      onClick={() => {
                        setShowCategorySelector(false);
                        setSelectedCategory(category.category);
                      }}
                    >
                      {category.category}
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
        <select
          name="category"
          className="hidden font-semibold min-w-min text-xs border-2 p-2 border-[#E3EBFD] rounded-md outline-none"
          onChange={(e) => {
            setCurrentSubCategory("");
            setSelectedCategory(e.target.value);
          }}
        >
          <option value={"all"}>All</option>
          {userData?.categories?.map((category, i) => {
            return (
              <option key={i} value={category.category}>
                {category.category}
              </option>
            );
          })}
        </select>
      </div>
      {!userData ? (
        <Spinner />
      ) : (
        <>
          <div className="py-2 flex flex-row flex-wrap gap-2">
            {subcategories.map((subcategory) => {
              return (
                <button
                  className={`${
                    currentSubCategory == subcategory.name
                      ? "bg-blue-600 text-white"
                      : "bg-transparent text-black"
                  } border border-blue-600 rounded-lg px-2 p-1 text-xs font-semibold`}
                  onClick={() => {
                    setCurrentSubCategory(
                      currentSubCategory == subcategory.name
                        ? ""
                        : subcategory.name
                    );
                  }}
                >
                  {subcategory.name}
                </button>
              );
            })}
          </div>
          <div className="">
            {groupedTransactions &&
              Object.keys(groupedTransactions).map(
                (date, i) => (
                  <div key={i} className="pt-4">
                    <h2 className="font-[600] text-[12px]">{formatDate(date)}</h2>
                    {groupedTransactions[date].map((transaction, index) => {
                      // console.log("rtansss", transaction);
                      if (
                        transaction.category !== selectedCategory &&
                        selectedCategory !== "all"
                      ) {
                        return;
                      } else {
                        if (
                          transaction.subcategory.name !== currentSubCategory &&
                          currentSubCategory !== ""
                        ) {
                          return;
                        } else {
                          return (
                            <div className="" key={index}>
                              <div
                                key={index}
                                className=" flex flex-row items-center justify-between gap-2 p-2 border-b border-[#E3EBFD]"
                              >
                                <p className="text-3xl flex-0 flex-start">
                                  {transaction.subcategory.icon}
                                </p>
                                <div className="flex-1 flex-start flex flex-col">
                                  <p className="text-[16px] font-semibold">
                                    {transaction.whatDidYouSpendOn}
                                  </p>
                                  <p className="text-sm">
                                    {transaction.subcategory.name}
                                  </p>
                                </div>
                                <p className="flex-0">₹{transaction.amount}</p>
                              </div>
                            </div>
                          );
                        }
                      }
                    })}
                  </div>
                )
                // </div>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsList;
