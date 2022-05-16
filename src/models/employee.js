import mongoose from 'mongoose';

const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
    },
    surname: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    gender: {
      type: String,
      required: false,
      enum: ['male', 'female', 'other'],
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
