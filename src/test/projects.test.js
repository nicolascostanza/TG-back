import request from 'supertest';
import projectsSeed from '../seeds/projects';
import app from '../app';
import Projects from '../models/Projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

// let projectId;

describe('Test Projects routes', () => {
  test('It should create a new project', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team: [
        {
          id: '60',
          name: 'Gaylor Renbold',
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
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    // projectId = response.body.data._id;
  });
});
