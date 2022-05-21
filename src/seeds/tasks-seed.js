import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('60a4a32f247e066e9495ce12'),
  parentProject: 'project seed',
  taskCreatorId: '60a4a32s247e066e9495ce12',
  taskName: 'Taks',
  assignedEmployee: [{
    employeeId: '60a4a32f24ae066e9495ce12',
    employeeRole: 'QA',
    employeeName: 'Employee',
  }],
  startDate: '20/05/2022',
  status: 'Ready to deliver',
}];
