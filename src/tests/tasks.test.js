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

describe('GET /tasks', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.status).toBe(200);
  });
  test('response should return error', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.error).toBe(false);
  });
  test('response should return at least one task', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
