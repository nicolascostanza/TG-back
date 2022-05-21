import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employees',
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks',
  },
  approved: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    enum: ['DEV', 'QA', 'PM', 'TL'],
    required: true,
  },
});

export default mongoose.model('Time-sheet', timeSheetsSchema);
