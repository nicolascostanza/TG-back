import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    parentProject: {
      type: String,
      required: true,
    },
    taskCreatorId: {
      type: String,
      required: true,
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
        employeeId: {
          type: String,
          required: true,
        },
        employeeRole: {
          type: String,
          required: true,
          enum: ['DEV', 'QA', 'PM', 'TL'],
        },
        employeeName: {
          type: String,
          required: true,
        },
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
  },
  { timestamps: true },
);

export default mongoose.model('Task', taskSchema);
