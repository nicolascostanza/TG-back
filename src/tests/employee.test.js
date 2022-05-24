import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeed from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeed);
});

describe('GET /employees', () => {
  test('It should return a 200 status', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
  });

  test('It should return a correct message', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.msg).toEqual('All employees are:');
  });

  test('It should return at least one employee', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('It should not return an empty employee', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.data).not.toBeNull();
  });

  test('It should return a 404 status', async () => {
    const response = await request(app).get('/nkjnkn').send();
    expect(response.status).toBe(404);
  });

  test('It should return a 404 status', async () => {
    const response = await request(app).get('/employee').send();
    expect(response.status).toBe(404);
  });

  test('It should be return false error', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.error).toBe(false);
  });
});
