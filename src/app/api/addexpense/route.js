import { NextResponse } from "next/server";
import { currentUser, auth } from "@clerk/nextjs/server";
import UserModel from "@/model/user";
import Expense from "@/model/expense";

export async function POST(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }
    const user = await currentUser();

    const { category, subcategory, amount, whatDidYouSpendOn } =
      await req.json();

    console.log(category, subcategory, amount, whatDidYouSpendOn);

    const userInDb = await UserModel.findOne({ clerkId: user.id.toString() });
const date = new Date()
    const newExpense = new Expense({
      user: userInDb._id,
      whatDidYouSpendOn,
      amount: amount.split("₹")[1],
      category,
      subcategory,
      date: date.toISOString()
    });

    if (!newExpense) {
      throw new Error("Failed to save new expense");
    }

    await newExpense.save();
    userInDb.expenses.push(newExpense);
    await userInDb.save();

    return NextResponse.json({ data: newExpense }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
