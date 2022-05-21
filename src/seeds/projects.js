import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('68a4a32f247e066e9495ce12'),
  name: 'Taulor',
  description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
  clientName: 'Gaylor Geikie',
  startDate: '03/18/2021',
  endDate: '05/02/2021',
  projectManager: 'Gaylor Renbold',
  team: [
    {
      id: '60',
      name: 'Taylor Renbold',
      role: 'PM',
      hours: 34,
      rate: 49,
    },
    {
      id: '61',
      name: 'Clea Nolli',
      role: 'DEV',
      hours: 89,
      rate: 42,
    },
    {
      id: '62',
      name: 'Mandie Ede',
      role: 'TL',
      hours: 55,
      rate: 40,
    },
    {
      id: '63',
      name: 'Bordie Garratt',
      role: 'QA',
      hours: 65,
      rate: 5,
    },
    {
      id: '64',
      name: 'Arlen Westrope',
      role: 'QA',
      hours: 22,
      rate: 23,
    },
    {
      id: '65',
      name: 'Sukey Elen',
      role: 'DEV',
      hours: 13,
      rate: 5,
    },
    {
      id: '66',
      name: 'Dilan Finci',
      role: 'DEV',
      hours: 49,
      rate: 27,
    },
  ],
  tasks: [
    {
      id: '091',
      name: 'InterdumMaurisNon.tiff',
      description: 'Other specified rickettsioses',
    },
  ],
}];
