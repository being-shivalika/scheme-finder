
import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  age: Number,
  gender: String,
  state: String,
  category: String,
  income: String,
  occupation: String,
  education: String,
  degree: String,
  isDisabled: Boolean,
  isMinority: Boolean,
  isBPL: Boolean,
});

export default mongoose.model('Profile', ProfileSchema);
