import axios from "axios";
import { useEffect, useState } from "react";

export default function ExpenseModal({ userData, setShowAddExpenseModal }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  //   const [userData, setUserData] = useState(data);
  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  async function handleExpense(e) {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      whatDidYouSpendOn: formData.get("what-did-you-spend-on"),
      amount: formData.get("amount"),
      category: formData.get("category"),
      subcategory: JSON.parse(formData.get("sub-category")),
    };

    const response = await axios.post("/api/addexpense", data);
    if(response.status !== 200){
      setError("Error Occured. Retry")
    }
    setIsLoading(false)
    e.target.reset()
    console.log(response);
  }

  useEffect(() => {
    if (userData?.categories?.length > 0) {
      const firstCategory = userData.categories[0].category;
      setSelectedCategory(firstCategory);
      setSubcategories(userData.categories[0].subcategories || []);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedCategory) {
      const categoryObj = userData.categories.find(
        (cat) => cat.category === selectedCategory
      );
      if (categoryObj) {
        setSubcategories(categoryObj.subcategories);
      } else {
        setSubcategories([]);
      }
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory]);

  return (
    <div className="fixed top-0 h-screen w-screen bg-black bg-opacity-40">
      <div
        className="h-full w-full flex items-center justify-center"
        onClick={() => setShowAddExpenseModal(false)}
      >
        <div
          className="bg-white p-8 px-12 rounded-lg w-[414px] h-[562px]"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold py-8 pb-12">New Expense</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleExpense(e)}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="what-did-you-spend-on"
                className="font-[500] text-[12px]"
              >
                What did you spend on?
              </label>
              <input
                name="what-did-you-spend-on"
                type="text"
                className="font-[400] text-[16px] w-full border-2 p-2 border-[#E3EBFD] rounded-md outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="font-[500] text-[12px]">
                Amount
              </label>
              <input
                name="amount"
                type="text"
                className="font-[400] text-[16px] w-full border-2 p-2 border-[#E3EBFD] rounded-md outline-none"
                onChange={(e) => {
                  if (e.target.value[0] !== "₹") {
                    e.target.value = "₹" + e.target.value;
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="font-[500] text-[12px]">
                Category
              </label>
              <select
                name="category"
                className="font-[400] text-[16px] w-full border-2 p-2 border-[#E3EBFD] rounded-md outline-none"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {userData?.categories?.map((category, i) => {
                  return (
                    <option key={i} value={category.category}>
                      {category.category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="sub-category" className="font-[500] text-[12px]">
                Sub-category
              </label>
              <select
                name="sub-category"
                className="font-[400] text-[16px] w-full border-2 p-2 border-[#E3EBFD] rounded-md outline-none"
              >
                {subcategories?.map((subcategory, i) => {
                  return (
                    <option
                      key={i}
                      value={JSON.stringify({
                        name: subcategory.name,
                        icon: subcategory.icon,
                      })}
                    >
                      {subcategory.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-full pt-4">
              <button
                className="w-full bg-blue-600 p-2 text-white rounded-md"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
