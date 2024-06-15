import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }
});

module.exports = SubcategorySchema;