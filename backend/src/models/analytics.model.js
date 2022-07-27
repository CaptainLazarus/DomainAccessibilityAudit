import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AnalyticsSchema = new Schema({
  analyticsId: { type: Schema.Types.ObjectId, ref: 'Analytics', index: true },
  url: String,
  status: String,
  errorMessage: String,
  nbViolations: [Number],
  average: Number,
  pairwisePercentage: [Number]
}, { timestamps: true });

export default mongoose.model('Analytics', AnalyticsSchema);