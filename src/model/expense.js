import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  whatDidYouSpendOn: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  subcategory: {
    name: { type: String, required: true },
    icon: { type: String, required: true },
  },
  date: { type: String, required: true },
});

const ExpenseModel =
  mongoose.models?.expense || mongoose.model("expense", ExpenseSchema);
module.exports = ExpenseModel;