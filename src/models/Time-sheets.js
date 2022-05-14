import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  employeeId: {
    type: String,
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
    enum: ['DEV', 'QA', 'PM', 'TL'],
    required: true,
  },
});

export default mongoose.model('Time-sheet', timeSheetsSchema);
