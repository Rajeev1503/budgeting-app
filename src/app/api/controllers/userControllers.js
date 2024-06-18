import UserModel from "@/model/user";
import dbConnect from "@/utils/dbConnect";
import categories from "./utils/category";
const userController = {
  checkIfUserIsNew: async (user) => {
    await dbConnect();
    let userInDb = await UserModel.findOne({clerkId: user.userId.toString()});
    if (!userInDb) {
      const newUser = new UserModel({
        clerkId: user.userId,
        username: user.sessionClaims.username,
        email: user.sessionClaims.email,
      });
      categories.map((category, i) => {
        newUser.categories.push({ category: categories[i].category });
        category.subcategories.map((subCategory, j) => {
          newUser.categories[i].subcategories.push(subCategory);
        });
      });
      await newUser.save();
    }
      return userInDb;
  },
};

export default userController;
