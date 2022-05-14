import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminsSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {timestamps: true}
);

export default mongoose.model('Super Admin', superAdminsSchema);
