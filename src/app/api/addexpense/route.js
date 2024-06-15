import { NextResponse } from 'next/server';
import { currentUser, auth } from "@clerk/nextjs/server";
import SuccessResponse from '@/utils/customResponses/successResponse';
import ErrorResponse from '@/utils/customResponses/errorResponse';
import User from '@/model/user'
import Expense from '@/model/expense'

export async function POST() {

  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  if (!userId) {
      return ErrorResponse(NextResponse, 401, "Unauthorized")
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();

  try {
    const { user:userReq, category, subcategory, amount, description } = req.body;

    const newExpense = new Expense({
      user,
      category,
      subcategory,
      amount,
      description,
    });

    await Expense.save();

    // Add the expense to the user's expense array
    await User.findByIdAndUpdate(user, { $push: { expenses: Expense._id } });

    SuccessResponse(NextResponse,200, newExpense);
    
  } catch (error) {
    ErrorResponse(NextResponse, 500, error.message)
  }

  // Perform your Route Handler's logic with the returned user object
return SuccessResponse(NextResponse, 200, user)
}