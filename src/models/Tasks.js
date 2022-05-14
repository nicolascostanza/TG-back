import mongoose from 'mongoose';

const { Schema } = mongoose;

const tasksSchema = new Schema(
  {
    parentProject: { type: String, required: true },
    taskCreator: { type: String, required: true },
    taskName: { type: String, required: true },
    taskDescription: { type: String, required: false },
    assignedEmployee: [
      {
        employeeId: { type: String, required: true },
        employeeRole: { type: String, required: true },
        employeeName: { type: String, required: true },
      },
    ],
    startDate: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ['Ready to deliver', 'Paused', 'Unassigned', 'Completed', 'In progress', 'Cancelled'],
    },
  },
  { timestamps: true },
);

export default mongoose.model('Tasks', tasksSchema);
