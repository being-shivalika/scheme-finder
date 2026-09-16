
import mongoose from 'mongoose';

const UserSchemeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schemeId: { type: String, required: true },
  status: { type: String, enum: ['matched', 'saved', 'applied'], default: 'matched' },
  eligibilityScore: Number,
  matchReason: String,
  schemeData: mongoose.Schema.Types.Mixed
});

export default mongoose.model('UserScheme', UserSchemeSchema);
