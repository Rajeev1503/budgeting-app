import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import { currentUser, auth } from "@clerk/nextjs/server";
import userController from "../controllers/userControllers";
export async function GET() {
  console.log("here cat sub cat");
  try {
    await dbConnect();
    const { userId } = auth();
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }

    const user = await currentUser();

  const userData = await userController.checkIfUserIsNew(user)
    // Add the expense to the user's expense array
console.log(userData);
    return NextResponse.json({ data: userData.user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
