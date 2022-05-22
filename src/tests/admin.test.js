import request from 'supertest'
import adminSeed from '../seeds/admin'
import Admins from '../models/Admins'
import app from '../app'

beforeAll(async () => {
  await Admins.collection.insertMany(adminSeed);
});

let adminId;

describe('Test Admins routes', () => {
  test('It should create a new admin', async () => {
    const response = await request(app).post('/').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    adminId = response.body.data._id;
  });
});

