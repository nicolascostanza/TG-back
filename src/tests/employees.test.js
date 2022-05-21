import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seed/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

describe('GET /employees', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
  });
  test('response should return error', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.error).toBe(false);
  });
});
