import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  clerkId: { type: String, require: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  provider: {type: String},
  password: { type: String },
  expenses: [{ type: Schema.Types.ObjectId, ref: "expense" }],
  categories: [
    {
      category: { type: String, unique: true },
      subcategories: [{ name: { type: String }, icon: { type: String } }],
    },
  ],
});

const UserModel = mongoose.models?.user || mongoose.model("user", UserSchema);
module.exports = UserModel;
