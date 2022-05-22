import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminSeed from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminSeed);
});

describe('GET /admins', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.status).toBe(200);
  });
});
