import request from 'supertest';
import app from '../app';
import SuperAdmins from '../models/Superadmin';
import superAdminsSeed from '../seeds/super-admin';

beforeAll(async () => {
  await SuperAdmins.collection.insertMany(superAdminsSeed);
});

describe('GET /super-admin', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.status).toBe(200);
  });

  test('response should return a 404 status', async () => {
    const response = await request(app).get('/1a1s2d').send();
    expect(response.status).toBe(404);
  });

  test('response should return a 404 status', async () => {
    const response = await request(app).get('/superadmin').send();
    expect(response.status).toBe(404);
  });

  test('response should return a 404 status', async () => {
    const response = await request(app).get('/superadmins').send();
    expect(response.status).toBe(404);
  });

  test('response should return a 404 status', async () => {
    const response = await request(app).get('/zassa').send();
    expect(response.status).toBe(404);
  });

  test('response should return a correct message', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.body.msg).toEqual('The list has been found');
  });

  test('response should return at least one super admin', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should not return less than one super admin', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.body.data.length).not.toBeLessThan(0);
  });

  test('response should not be an empty super admin', async () => {
    const response = await request(app).get('/super-admins').send();
    expect(response.body.data).not.toBeNull();
  });
});
