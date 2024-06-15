import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: "category" },
  name: { type: String, required: true },
  icon: { type: String, required: true },
});

const SubCategoryModel =
  mongoose.models?.subCategory ||
  mongoose.model("subCategory", SubCategorySchema);
module.exports = SubCategoryModel;
