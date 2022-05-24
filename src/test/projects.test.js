import request from 'supertest';
import app from '../app';
import tasksSeed from '../seeds/tasks';
import employeesSeed from '../seeds/employees';
import projectsSeed from '../seeds/projects';

import Tasks from '../models/Tasks';
import Employees from '../models/Employees';
import Proyects from '../models/Projects';

beforeAll(async () => {
  await Tasks.collection.insertMany(tasksSeed);
  await Employees.collection.insertMany(employeesSeed);
  await Proyects.collection.insertMany(projectsSeed);
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
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    projectId = response.body.data._id;
  });
  test('This PUT should edit a project', async () => {
    const response = await request(app).put(`/projects/edit/${projectId}`).send({
      name: 'Gaylor',
      description: 'dis new montes edit ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor edit',
      startDate: '04/18/2021',
      endDate: '09/02/2021',
      projectManager: 'Gaylor Edited',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(202);
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
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
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
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
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
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
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
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
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
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
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
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.error).toBeTruthy();
  });
});

describe('Test lengths', () => {
  test('This POST test thes give us the validations of the name lengths, equal than joi', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.name.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.name.length).toBeLessThanOrEqual(30);
  });
  test('This POST test thes give us the validations of the description lengths, equal than joi', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.description.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.description.length).toBeLessThanOrEqual(300);
  });
  test('This POST test thes give us the validations of the client name lengths, equal than joi', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.clientName.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.clientName.length).toBeLessThanOrEqual(30);
  });
  test('This POST test thes give us the validations of the project manager lengths, equal than joi', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.projectManager.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.projectManager.length).toBeLessThanOrEqual(30);
  });
  test('This PUT test thes give us the validations of the name lengths, equal than joi', async () => {
    const response = await request(app).put(`/projects/edit/${projectId}`).send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.name.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.name.length).toBeLessThanOrEqual(30);
  });
  test('This PUT test thes give us the validations of the description lengths, equal than joi', async () => {
    const response = await request(app).put(`/projects/edit/${projectId}`).send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.description.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.description.length).toBeLessThanOrEqual(300);
  });
  test('This PUT test thes give us the validations of the client name lengths, equal than joi', async () => {
    const response = await request(app).put(`/projects/edit/${projectId}`).send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.clientName.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.clientName.length).toBeLessThanOrEqual(30);
  });
  test('This PUT test thes give us the validations of the project manager lengths, equal than joi', async () => {
    const response = await request(app).put(`/projects/edit/${projectId}`).send({
      name: 'Taylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.body.data.projectManager.length).toBeGreaterThanOrEqual(3);
    expect(response.body.data.projectManager.length).toBeLessThanOrEqual(300);
  });
});
describe('Test missing parameters', () => {
  test('This POST should throw an error 400 because name is missing', async () => {
    const response = await request(app).post('/projects/create').send({
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because description is missing', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Gaylor',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because client name is missing', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      startDate: '03/18/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because start date is missing', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because project manager is missing', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '20/04/2021',
      endDate: '05/02/2021',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because team is missing', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '20/04/2021',
      endDate: '05/02/2021',
      projectManager: 'Gaylor Renbold',
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should throw an error 400 because tasks is missing', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '20/04/2021',
      endDate: '05/02/2021',
      projectManager: 'Garrison Drake',
      team:
      ['60a4a32f24ae066e9495ce12'],
    });
    expect(response.statusCode).toBe(400);
  });
  test('This POST should not throw an error because end date is not necessary', async () => {
    const response = await request(app).post('/projects/create').send({
      name: 'Gaylor',
      description: 'dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor Geikie',
      startDate: '03/18/2021',
      projectManager: 'Gaylor Renbold',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(201);
  });
  test('This PUT should throw an error 500 because id is not correct', async () => {
    const response = await request(app).put('/projects/edit/0303456').send({
      name: 'Gaylor',
      description: 'dis new montes edit ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis',
      clientName: 'Gaylor edit',
      startDate: '04/18/2021',
      endDate: '09/02/2021',
      projectManager: 'Gaylor Edited',
      team:
      ['60a4a32f24ae066e9495ce12'],
      tasks:
      ['60a4a32f247e066e9495ce12'],
    });
    expect(response.statusCode).toBe(500);
  });
});
