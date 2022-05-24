import request from 'supertest';
import projectSeed from '../seeds/projects';
import Projects from '../models/Projects';
import app from '../app';

beforeAll(async () => {
  await Projects.collection.insertMany(projectSeed);
});

describe('GET ALL/Projects', () => {
  test('It should should show all projects and return a 200 status', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.status).toBe(200);
  });

  test('It should return a successful message', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.message).toEqual(' Data for all projects has been sent');
  });

  test('It should return at least one project', async () => {
    const response = await request(app).get('/projects').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('It should NOT return any project, due to wrong path', async () => {
    const response = await request(app).get('/notproject').send();
    expect(response.statusCode).toBe(404);
  });
});
