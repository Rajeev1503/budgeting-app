import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  subcategories: {
    type: Schema.Types.ObjectId,
    ref: 'subCategory'
  }
});

const CategoryModel = mongoose.models?.category || mongoose.model("category", CategorySchema);
module.exports = CategoryModel;