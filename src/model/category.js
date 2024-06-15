import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import SubcategorySchema from './subCategory';

const ExpenseCategorySchema = new Schema({
  category: { type: String, required: true },
  subcategories: [SubcategorySchema]
});

const ExpenseCategory = mongoose.model('ExpenseCategory', ExpenseCategorySchema);

module.exports = ExpenseCategory;