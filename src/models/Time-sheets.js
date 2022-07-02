import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSheetsSchema = new Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
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
  task: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  approved: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    enum: ['DEV', 'QA', 'PM', 'TL'],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Time-sheet', timeSheetsSchema);
