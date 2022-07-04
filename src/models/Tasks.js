import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    parentProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },

    taskName: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: false,
    },
    assignedEmployee: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Ready to deliver', 'Paused', 'Unassigned', 'Completed', 'In progress', 'Cancelled'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Task', taskSchema);
