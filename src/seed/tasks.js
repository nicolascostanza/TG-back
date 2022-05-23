import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('6281f3e9c46e43281c20d604'),
  parentProject: '910864632',
  taskCreatorId: '837409814',
  taskName: 'SagittisNam.mov',
  taskDescription: 'Adverse effect of antirheumatics, NEC, subs',
  assignedEmployee: [{
    employeeId: '765370710', employeeRole: 'QA', employeeName: 'Mateo Moisey', _id: { $oid: '6281f3e9c46e43281c20d605' },
  }],
  startDate: { $date: { $numberLong: '1630897200000' } },
  status: 'Paused',
  createdAt: { $date: { $numberLong: '1652683753341' } },
  updateAt: { $date: { $numberLong: '1652683753341' } },
}];
