import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  clerkId: { type: String, require: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
