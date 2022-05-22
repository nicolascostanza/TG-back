import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Superadmin';
import superAdminsSeed from '../seeds/super-admin-seed';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});

describe('GET /super-admin', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/super-admin').send();
    console.log(response);
  });
});
