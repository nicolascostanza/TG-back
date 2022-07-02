import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminSchema = new Schema({
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
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Admin', adminSchema);
