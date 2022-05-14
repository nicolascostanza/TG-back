import mongoose from 'mongoose';

const { Schema } = mongoose;

const tasksSchema = new Schema(
  {
    parentProject: { type: String, required: true },
    // Could taskCreator be an ID?
    taskCreator: { type: mongoose.Types.ObjectId, required: true },
    taskName: { type: String, required: true },
    taskDescription: { type: String, required: false },
    // assignedEmployee redudant
    assignedEmployee: [
      {
        employeeId: { type: mongoose.Types.ObjectId, required: true },
        employeeRole: { type: String, required: true },
        employeeName: { type: String, required: true },
      },
    ],
    // timestamps replaces startDate?
    // startDate: { type: Date, required: true },
    status: {
      type: Boolean,
      required: false,
      enum: ['Ready to deliver', 'Paused', 'Unassigned', 'Completed', 'In progress', 'Cancelled'],
    },
  },
  { timestamps: true },
);

export default mongoose.model('Tasks', tasksSchema);
