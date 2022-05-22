import request from 'supertest';
import Admins from '../models/Admins';
import adminsSeed from '../seeds/admins';
import app from '../app';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

describe('GET by ID admins', () => {
  test('response should return a 200 status', async () => {
    const response = await (await request(app).get('/admins')).send();
    // eslint-disable-next-line no-console
    console.log(response);
  });
});
