import mongoose from 'mongoose';

const Schem = mongoose.Schema;

const employeeSchema = new Schem(
  {
    id: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    gender: {
      type: String,
      required: false,
    },
    adress: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    phone: {
      type: Number,
      required: false,
      min: 10,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Employee', employeeSchema);
