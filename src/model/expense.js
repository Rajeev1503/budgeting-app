import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;