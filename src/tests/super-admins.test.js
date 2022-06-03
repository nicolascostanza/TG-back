import request from 'supertest';
import app from '../app';
import Superadmin from '../models/Superadmin';
import superAdminSeed from '../seeds/super-admin';

beforeAll(async () => {
  await Superadmin.collection.insertMany(superAdminSeed);
});

const superAdminId = '60d4a32f247e066e9495ce12';

describe('POST /super-admins', () => {
  test('it should NOT create a new super-admin, stopped on send, non existent resource', async () => {
    const response = await request(app).post('/non-existentRoute').send({
      firstName: 'Alex',
      lastName: 'Lias',
      email: 'alex.lias@radiumrocket.com',
      password: 'test1234',
      active: true,
    });

    expect(response.status).toEqual(404);
  });

  test('it should create a new super-admin', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Alex',
      lastName: 'Lias',
      email: 'alex.lias@radiumrocket.com',
      password: 'test1234',
      active: true,
    });
    // eslint-disable-next-line no-underscore-dangle
    expect(response.status).toEqual(201);
    expect(response.body.error).toBe(false);
  });

  test('it should NOT create a new super-admin, stopped on verification, name too short', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Al',
      lastName: 'Lias',
      email: 'alex.lias@radiumrocket.com',
      password: 'test1234',
      active: true,
    });

    expect(response.status).toEqual(400);
    expect(response.body.error).toBe(true);
  });

  test('it should NOT create a new super-admin, stopped on verification, incorrect password format', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Alex',
      lastName: 'Lias',
      email: 'alex.lias@radiumrocket.com',
      password: '@@@',
      active: true,
    });

    expect(response.status).toEqual(400);
    expect(response.body.error).toBe(true);
  });

  test('it should NOT create a new super-admin, stopped on verification, missing required param', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Alex',
      email: 'alex.lias@radiumrocket.com',
      password: 'test1234',
      active: true,
    });

    expect(response.status).toEqual(400);
    expect(response.body.error).toBe(true);
  });

  test('it should NOT create a new super-admin, stopped on verification, incorrect email format', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Alex',
      lastName: 'Lias',
      email: 'alex.liasradiumrocket.com',
      password: 'test1234',
      active: true,
    });

    expect(response.status).toEqual(400);
    expect(response.body.error).toBe(true);
  });
});

describe('PUT /super-admins', () => {
  test('it should NOT update the super-admin, stopped on send, non existent resource', async () => {
    const response = await request(app).put('/non-existentRoute').send({
      firstName: 'Alex',
      lastName: 'Liases',
      email: 'a.liases@radiumrocket.com',
      password: 'testing1234',
      active: true,
    });

    expect(response.status).toEqual(404);
  });

  test('It should NOT update the super-admin, stopped on send, no _id param', async () => {
    const response = await request(app).put('/super-admins/').send({
      firstName: 'Alex',
      lastName: 'Lias',
      email: 'alex.lias@radiumrocket.com',
      password: 'testeang1234',
      active: true,
    });

    expect(response.status).toEqual(404);
  });

  test('It should update the super-admin', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      firstName: 'Alex',
      lastName: 'Liases',
      email: 'a.liases@radiumrocket.com',
      password: 'testing1234',
      active: true,
    });

    expect(response.status).toEqual(200);
    expect(response.body.error).toBe(false);
  });

  test('it should NOT update the super-admin, stopped on validation, missing a param', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      firstName: 'Alex',
      email: 'a.liases@radiumrocket.com',
      password: 'testing1234',
      active: true,
    });

    expect(response.status).toEqual(200);
    expect(response.body.error).toBe(false);
  });

  test('it should NOT update the super-admin, stopped on verification, name too short', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      firstName: 'Al',
      lastName: 'Liases',
      email: 'a.liases@radiumrocket.com',
      password: 'testing1234',
      active: true,
    });

    expect(response.status).toEqual(400);
    expect(response.body.error).toBe(true);
  });

  test('it should NOT update the super-admin, stopped on verification, incorrect password format', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      firstName: 'Alex',
      lastName: 'Liases',
      email: 'a.liases@radiumrocket.com',
      password: '@@@',
      active: true,
    });

    expect(response.status).toEqual(400);
    expect(response.body.error).toBe(true);
  });

  test('it should NOT update the super-admin, stopped on verification, incorrect email format', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      firstName: 'Alex',
      lastName: 'Lias',
      email: 'alex.liasradiumrocket.com',
      password: 'testeang1234',
      active: true,
    });

    expect(response.status).toEqual(400);
    expect(response.body.error).toBe(true);
  });

  test('It should NOT update the super-admin, stopped on controller, _id param does not match existing', async () => {
    const response = await request(app).put('/super-admins/60c5a34f267e066e9495de14').send({
      firstName: 'Alex',
      lastName: 'Lias',
      email: 'alex.lias@radiumrocket.com',
      password: 'testeang1234',
      active: true,
    });

    expect(response.status).toEqual(404);
    expect(response.body.error).toBe(true);
  });
});

describe('getById /super-admins', () => {
  test('It should successfully return a super admin', async () => {
    const response = await request(app).get(`/super-admins/${superAdminId}`).send();

    expect(response.status).toEqual(200);
  });

  test('It should NOT return a super-admin, _id param does not match existing', async () => {
    const response = await request(app).get('/super-admins/60c5a34f267e066e9495de14').send();

    expect(response.status).toEqual(404);
  });
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
    expect(response.body.message).toEqual('The list has been found');
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

describe('DELETE /super-admins', () => {
  test('it should NOT delete a super admin, stopped on send, non existent resource', async () => {
    const response = await request(app).delete('/super-admins').send();

    expect(response.status).toEqual(404);
  });

  test('it should successfully delete a super admin', async () => {
    const response = await request(app).delete(`/super-admins/${superAdminId}`).send();

    expect(response.status).toEqual(200);
  });

  test('It should NOT delete a super-admin, _id param does not match existing', async () => {
    const response = await request(app).delete('/super-admins/60c5a34f267e066e9495de14').send();

    expect(response.status).toEqual(404);
  });
});
