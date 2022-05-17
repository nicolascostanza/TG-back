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
    },
    gender: {
      type: String,
      required: false,
      enum: ['Male', 'Female', 'Other'],
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
      minlength: 8,
    },
    phone: {
      type: String,
      required: false,
      minlength: 9,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Employee', employeeSchema);
