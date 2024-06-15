// import SubCategoryModel from "@/model/subCategory";
// import CategoryModel from "@/model/category";
// import { NextResponse } from "next/server";
// import SuccessResponse from "@/utils/customResponses/successResponse";
// import ErrorResponse from "@/utils/customResponses/errorResponse";
// import dbConnect from "@/utils/dbConnect";
// export async function GET() {
//   try {

//     await dbConnect()
//     const categories = [
//     //   {
//     //     name: "Essential Expenses",
//     //   },
//     //   {
//     //       name: "Non-Essential Expenses",
//     //   },
//     //   {
//     //       name: "Savings and Investments",
//     //   },
//       {
//           name: "Miscellaneous",
//       },
//     ];

//     const subCategories = [
//         {
//           "name": "Savings",
//           "icon": "💰"
//         },
//         {
//           "name": "Investments",
//           "icon": "📈"
//         }
//       ]

//     const category = new CategoryModel(      {
//         name: "Savings and Investments",
//     },);
//     await category.save();
//     subCategories.map(async (item) => {
//       const newSubCategory = new SubCategoryModel({
//         category: category._id,
//         name: item.name,
//         icon: item.icon,
//       });
//       await newSubCategory.save();
//       await CategoryModel.findByIdAndUpdate(category._id, {
//         $push: { subcategories: newSubCategory._id },
//       });
//     });

//     // Add the expense to the user's expense array

//     return NextResponse.json({ error: "Success" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
