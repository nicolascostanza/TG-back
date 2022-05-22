import request from 'supertest';
import projectsSeed from '../seeds/projects';
import app from '../app';
import Projects from '../models/Projects';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
});

let projectId;

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
    projectId = response.body.data._id;
  });
});

describe('Test mesagges of project Routes', () => {
  test('This POST should give a seccess mesagge', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Taylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Taylor Renbold',
      team: [
        {
          id: '60',
          name: 'Taylor Renbold',
          role: 'PM',
          hours: 34,
          rate: 49,
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
    expect(response.body.message).toEqual('Project has been created');
  });
  test('This PUT should give a seccess mesagge', async () => {
    const response = await request(app).put(`/projects/edit/${projectId}`).send({
      name: 'Gaylor',
      description: 'dis new montes edit ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor edit',
      startDate: '04/18/2021',
      endDate: '09/02/2021',
      projectManager: 'Gaylor Edited',
      team: [
        {
          id: '60',
          name: 'Gaylor Edited',
          role: 'PM',
          hours: 34,
          rate: 49,
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
    expect(response.statusCode).toBe(202);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toEqual('Project succesfully updated');
  });
});

describe('Test errors for response', () => {
  test('This POST should give us a false error', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Green',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Green Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Green Renbold',
      team: [
        {
          id: '60',
          name: 'Gaylor Renbold',
          role: 'PM',
          hours: 34,
          rate: 49,
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
    expect(response.body.error).not.toBeTruthy();
  });
  test('This PUT should give us a false error', async () => {
    const response = await request(app).put(`/projects/edit/${projectId}`).send({
      name: 'Blue',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Blue Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Blue Renbold',
      team: [
        {
          id: '60',
          name: 'Gaylor Renbold',
          role: 'PM',
          hours: 34,
          rate: 49,
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
    expect(response.body.error).not.toBeTruthy();
  });
  test('This POST should give us a true error', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'A',
      description: 'b',
      clientName: 'Green Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Green Renbold',
      team: [
        {
          id: '60',
          name: 'Gaylor Renbold',
          role: 'PM',
          hours: 34,
          rate: 49,
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
    expect(response.body.error).toBeTruthy();
  });
  test('This PUT should give us a true error', async () => {
    const response = await request(app).put(`/projects/edit/${projectId}`).send({
      name: 'c',
      description: 'd',
      clientName: 'Green Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Green Renbold',
      team: [
        {
          id: '60',
          name: 'Gaylor Renbold',
          role: 'PM',
          hours: 34,
          rate: 49,
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
    expect(response.body.error).toBeTruthy();
  });
});

describe('Test lengths', () => {
  test('This POST test thes give us the validations of the data lengths, equal than joi', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Taylor',
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
      ],
      tasks: [
        {
          id: '091',
          name: 'InterdumMaurisNon.tiff',
          description: 'Other specified rickettsioses',
        },
      ],
    });
    expect(response.body.data.name.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.name.length).toBeLessThanOrEqual(30);
    expect(response.body.data.description.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.description.length).toBeLessThanOrEqual(300);
    expect(response.body.data.clientName.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.clientName.length).toBeLessThanOrEqual(30);
    expect(response.body.data.projectManager.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.projectManager.length).toBeLessThanOrEqual(30);
    expect(response.body.data.team[0].id.length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.team[0].id.length).toBeLessThanOrEqual(11);
    expect(response.body.data.team[0].name.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.team[0].name.length).toBeLessThanOrEqual(31);
    expect(response.body.data.team[0].hours.toString().length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.team[0].rate.toString().length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.team[0].rate.toString().length).toBeLessThanOrEqual(1000);
    expect(response.body.data.tasks[0].id.length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.tasks[0].id.length).toBeLessThanOrEqual(10);
    expect(response.body.data.tasks[0].name.length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.tasks[0].name.length).toBeLessThanOrEqual(30);
    expect(response.body.data.tasks[0].description.length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.tasks[0].description.length).toBeLessThanOrEqual(200);
  });
  test('This PUT test thes give us the validations of the data lengths, equal than joi', async () => {
    const response = await request(app).put(`/projects/edit/${projectId}`).send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team: [
        {
          id: '88',
          name: 'Gaylor Renbold',
          role: 'PM',
          hours: 34,
          rate: 49,
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
    expect(response.body.data.name.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.name.length).toBeLessThanOrEqual(30);
    expect(response.body.data.description.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.description.length).toBeLessThanOrEqual(200);
    expect(response.body.data.clientName.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.clientName.length).toBeLessThanOrEqual(30);
    expect(response.body.data.projectManager.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.projectManager.length).toBeLessThanOrEqual(30);
    expect(response.body.data.team[0].id.length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.team[0].id.length).toBeLessThanOrEqual(11);
    expect(response.body.data.team[0].name.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.team[0].name.length).toBeLessThanOrEqual(31);
    expect(response.body.data.team[0].hours.toString().length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.team[0].rate.toString().length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.team[0].rate.toString().length).toBeLessThanOrEqual(1000);
    expect(response.body.data.tasks[0].id.length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.tasks[0].id.length).toBeLessThanOrEqual(10);
    expect(response.body.data.tasks[0].name.length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.tasks[0].name.length).toBeLessThanOrEqual(30);
    expect(response.body.data.tasks[0].description.length).toBeGreaterThanOrEqual(1);
    expect(response.body.data.tasks[0].description.length).toBeLessThanOrEqual(200);
  });
});
