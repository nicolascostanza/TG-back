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
        id: { type: String, required: true },
        name: { type: String, required: true },
        role: { type: String, enum: ['DEV', 'QA', 'PM', 'TL'], required: true },
        hours: { type: Number, required: true },
        rate: { type: Number, required: true },
      },
    ],
    tasks: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);
