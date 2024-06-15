import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  clerkId: { type: String, require: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  expenses: [{ type: Schema.Types.ObjectId, ref: "expense" }],
});

const UserModel = mongoose.models?.user || mongoose.model("user", UserSchema);
module.exports = UserModel;