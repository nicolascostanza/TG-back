import request from 'supertest';
import app from '../app';
import Projects from '../models/Projects';
import Employees from '../models/Employees';
import Task from '../models/Tasks';
import projectsSeed from '../seeds/projects';
import employeeSeed from '../seeds/employees';
import taskSeed from '../seeds/tasks';

beforeAll(async () => {
  await Projects.collection.insertMany(projectsSeed);
  await Employees.collection.insertMany(employeeSeed);
  await Task.collection.insertMany(taskSeed);
});

const projectId = '68a4a32f247e066e9495ce12';

describe('GET projects/id ', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.status).toBe(200);
  });
  test('response should return a false error', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.error).toBeFalsy();
  });
  test('response should return a 404 status', async () => {
    const response = await request(app).get(`/merequetengue/${projectId}`).send();
    expect(response.status).toBe(404);
  });
  test('response should return a message', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.body.message).toEqual(`Data for project with id ${projectId} has been sent`);
  });
  test('response should not return without a name', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.body.data).toHaveProperty('name');
  });
  test('response should not return without a description', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.body.data).toHaveProperty('description');
  });
  test('response should not return without a client name', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.body.data).toHaveProperty('clientName');
  });
  test('response should not return without a start date', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.body.data).toHaveProperty('startDate');
  });
  test('response should not return without a end date', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.body.data).toHaveProperty('endDate');
  });
  test('response should not return without a project manager', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.body.data).toHaveProperty('projectManager');
  });
  test('response should not return without a team', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.body.data).toHaveProperty('team');
  });
  test('response should not return without a task sheet', async () => {
    const response = await request(app).get(`/projects/${projectId}`).send();
    expect(response.body.data).toHaveProperty('task');
  });
  // test('', async () => {
  //   const response = await request(app).get(`/projects/${projectId}`).send();
  //   expect(response.body.data).not.toBeNull();
  // });
});

// describe('DELETE projects/id', () => {
//   test('response should return a 200 status', async () => {
//     const response = await request(app).delete(`/projects/${projectId}`).send();
//     expect(response.status).toBe(200);
//   });
// });
