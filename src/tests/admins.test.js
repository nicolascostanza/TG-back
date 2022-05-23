import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminsSeed from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminsSeed);
});

const adminId = '60d4a32f257e066e9495ce12';

describe('GET by ID /admins', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.status).toBe(200);
  });

  test('response should return a false error', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.error).toBe(false);
  });

  test('response should return an error, empty admin', async () => {
    const response = await request(app).get('/admins/60d4a32f257e066e9495ce15').send();
    expect(response.status).toBe(404);
  });

  test('response should return an error, bad path', async () => {
    const response = await request(app).get('/asdasd').send();
    expect(response.status).toBe(404);
  });

  test('response should return an admin with first name', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.data).toHaveProperty('firstName');
  });

  test('response should return an admin with last name', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.data).toHaveProperty('lastName');
  });

  test('response should return an admin with email', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.data).toHaveProperty('email');
  });

  test('response should return an admin with password', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.data).toHaveProperty('password');
  });

  test('response should return an admin with active', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.data).toHaveProperty('active');
  });

  test('response should return an admin object', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.data).not.toBeNull();
  });

  test('response should return a successful message', async () => {
    const response = await request(app).get(`/admins/${adminId}`).send();
    expect(response.body.message).toEqual('The admin is:');
  });
});

describe('DELETE /admins', () => {
  test('response should return a false error, 200 status and successful message', async () => {
    const response = await request(app).delete(`/admins/${adminId}`).send();
    expect(response.error).toBeFalsy();
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Admin succesfully deleted');
  });

  test('response should return an error, empty admin', async () => {
    const response = await request(app).delete('/admins/').send();
    expect(response.status).toBe(404);
  });

  test('response should return an error, bad path', async () => {
    const response = await request(app).delete('/asdasd').send();
    expect(response.status).toBe(404);
  });
});
