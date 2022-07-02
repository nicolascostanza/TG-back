import mongoose from 'mongoose';

const { Schema } = mongoose;

const SuperAdminsSchema = new Schema(
  {
    firebaseUid: { type: String, required: true },
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Super-admin', SuperAdminsSchema);
