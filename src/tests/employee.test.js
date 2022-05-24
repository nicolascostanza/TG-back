import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeesSeeds from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeesSeeds);
});

describe('GetById /employees', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/employees/60d4a32f257e066e8495ce12').send();
    expect(response.status).toBe(200);
  });

  test('response should not return error', async () => {
    const response = await request(app).get('/employees/60d4a32f257e066e8495ce12').send();
    expect(response.error).toBe(false);
  });

  test('the employee with id X much was not found', async () => {
    const response = await request(app).get('/employees/60d4a32f257e066e84951234').send();
    expect(response.status).toBe(400);
  });

  test('returns the required information', async () => {
    const response = await request(app).get('/employees/60d4a32f257e066e8495ce12').send();
    expect(response.body.data).not.toBeNull();
  });

  test('response should return an admin with active', async () => {
    const response = await request(app).get('/employees/60d4a32f257e066e8495ce12').send();
    expect(response.body.data).toHaveProperty('email');
  });
});

describe('Delete /employees', () => {
  test('Delete should return error', async () => {
    const response = await request(app).get('/employees/60d4a32f257e066e8495fa15').send();
    expect(response.body.error).toBe(true);
  });

  test('Delete should not return error', async () => {
    const response = await request(app).get('/employees/60d4a32f257e066e8495ce12').send();
    expect(response.error).toBe(false);
  });

  test('It should delete a employee', async () => {
    const response = await request(app).delete('/employees/60d4a32f257e066e8495ce12');
    expect(response.status).toBe(200);
    expect(response.body.msg).toEqual('The employee with former id of 60d4a32f257e066e8495ce12 has been succesfully deleted');
  });
});
