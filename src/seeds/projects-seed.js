import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('68a4a32f247e066e9495ce12'),
  name: 'project a',
  description: 'a single project',
  clientName: 'Radium Rocket',
  startDate: '20/05/2022',
  endDate: '24/05/2022',
  projectManager: 'Alfonso Dalix',
  team: [{
    id: '60a4a32f24ae066e9495ce12',
    name: 'A',
    role: 'DEV',
    hours: '40',
    rate: '12',
  }],
  task: [{
    id: '60a4d32f24ae066e9495ce12',
    name: 'Task',
    description: 'a simple task',
  }],
}];
