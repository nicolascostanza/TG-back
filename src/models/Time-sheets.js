import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  project: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Time-sheet', timeSheetsSchema);
