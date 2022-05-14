import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
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
    type: String,
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
