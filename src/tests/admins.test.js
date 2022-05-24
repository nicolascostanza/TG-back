import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminSeed from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminSeed);
});

describe('GET /admins', () => {
  test('Response status has to be 200', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.status).toBe(200);
  });

  test('Error has to be false', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.clientError).toBeFalsy();
  });

  test('response status has to be 404 because route does not exist', async () => {
    const response = await request(app).get('/dasdsa').send();
    expect(response.status).toBe(404);
  });

  test('Error has to be true because route does not exist', async () => {
    const response = await request(app).get('/dasdsa').send();
    expect(response.clientError).toBeTruthy();
  });

  test('response should return at least one admin', async () => {
    const response = await request(app).get('/admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
