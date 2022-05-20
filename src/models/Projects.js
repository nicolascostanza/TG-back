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
    projectManager: {
      type: String,
      required: true,
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employees',
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks',
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);
