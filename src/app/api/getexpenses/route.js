import { NextResponse } from "next/server";
import { currentUser, auth } from "@clerk/nextjs/server";
import User from "@/model/user";

export async function GET() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Not authorized" }, { status: 400 });
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  console.log(user);
  try {
    // const { user:userReq, category, subcategory, amount, description } = req.body;
    // Add the expense to the user's expense array
    const user = await User.findOne({ clerkId: user.id });

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

}
