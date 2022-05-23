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

describe('POST /employees', () => {
  test('should create an employee', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      surname: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      adress: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(201);
  });

  test('message should indicate the creation of an employee', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      surname: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      adress: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.body.msg).toEqual('Employee has been successfuly created');
  });
});
