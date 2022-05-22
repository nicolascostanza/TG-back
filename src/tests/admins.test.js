import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

describe('GET by ID admins', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/admins/60d4a32f257e066e9495ce12').send();
    expect(response.status).toBe(200);
  });

  test('response should return a false error', async () => {
    const response = await request(app).get('/admins/60d4a32f257e066e9495ce12').send();
    expect(response.error).toBe(false);
  });

  test('response should return an error, empty admin', async () => {
    const response = await request(app).get('/admins/').send();
    expect(response.error).toBe(true);
  });

  test('response should return an error, bad path', async () => {
    const response = await request(app).get('/asdasd').send();
    expect(response.error).toBe(true);
  });

  test('response should return an error', async () => {
    const response = await request(app).get('/asdasd').send();
    expect(response.status).toBe(404);
  });

  test('response should return an ID', async () => {
    const response = await request(app).get('/admins/60d4a32f257e066e9495ce12').send();
    expect(response.body.data.length).toBe(1);
  });

  test('response should return an ID', async () => {
    const response = await request(app).get('/admins/60d4a32f257e066e9495ce12').send();
    expect(response.body.message).toEqual('The admin is:');
  });
});
