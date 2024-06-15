import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

const ExpenseModel = mongoose.models?.expense || mongoose.model("expense", ExpenseSchema);
module.exports = ExpenseModel;