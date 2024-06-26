import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { currentUser, auth } from "@clerk/nextjs/server";
import userController from "../controllers/userControllers";
import ExpenseModel from "@/model/expense";
export async function GET() {
  try {
    await dbConnect();
    const user = auth();
    if (!user.userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }
    const userData = await userController.checkIfUserIsNew(user);
    const getexpenses = await ExpenseModel.find({ user: userData._id }).sort({date: -1});
    return NextResponse.json(
      { userData: userData, userExpenses: getexpenses },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
