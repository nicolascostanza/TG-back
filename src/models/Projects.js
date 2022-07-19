import mongoose from 'mongoose';

const { Schema } = mongoose;

const projectSchema = new Schema(

  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    team: [
      {
        _id: false,
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
        role: { type: String, enum: ['QA', 'DEV', 'TL'] },
        rate: { type: Number },
        isPM: { type: Boolean, default: false },
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);
