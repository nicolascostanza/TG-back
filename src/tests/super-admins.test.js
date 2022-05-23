import request from 'supertest';
import app from '../app';
import Superadmin from '../models/Superadmin';
import superAdminSeed from '../seeds/super-admin';

beforeAll(async () => {
  await Superadmin.collection.insertMany(superAdminSeed);
});

let superAdminId;

describe('POST /super-admins', () => {
  test('it should NOT create a new super-admin, stopped on send, non existent resource', async () => {
    const response = await request(app).post('/non-existentRoute').send({
      firstName: 'Alex',
      lastName: 'Lias',
      email: 'alex.lias@radiumrocket.com',
      password: 'test1234',
      active: true,
    });

    expect(response.statusCode).toEqual(404);
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
    superAdminId = response.body.data._id;

    expect(response.statusCode).toEqual(201);
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

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toBe(true);
  });

  test('it should NOT create a new super-admin, stopped on verification, incorrect password format', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Alex',
      lastName: 'Lias',
      email: 'alex.lias@radiumrocket.com',
      password: '123456789',
      active: true,
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toBe(true);
  });

  test('it should NOT create a new super-admin, stopped on verification, missing required param', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Alex',
      email: 'alex.lias@radiumrocket.com',
      password: 'test1234',
      active: true,
    });

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toBe(true);
  });

  test('it should NOT create a new super-admin, stopped on verification, incorrect email format', async () => {
    const response = await request(app).post('/super-admins').send({
      firstName: 'Alex',
      lastName: 'Lias',
      email: 'alex.liasradiumrocket.com',
      password: 'testeandoPorAy',
      active: true,
    });

    expect(response.statusCode).toEqual(400);
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

    expect(response.statusCode).toEqual(404);
  });

  test('It should NOT update the super-admin, stopped on send, no _id param', async () => {
    const response = await request(app).put('/super-admins/').send({
      firstName: 'Alex',
      lastName: 'Lias',
      email: 'alex.lias@radiumrocket.com',
      password: 'testeang1234',
      active: true,
    });

    expect(response.statusCode).toEqual(404);
  });

  test('It should update the super-admin', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      firstName: 'Alex',
      lastName: 'Liases',
      email: 'a.liases@radiumrocket.com',
      password: 'testing1234',
      active: true,
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.error).toBe(false);
  });

  test('it should NOT update the super-admin, stopped on validation, missing a param', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      firstName: 'Alex',
      email: 'a.liases@radiumrocket.com',
      password: 'testing1234',
      active: true,
    });

    expect(response.statusCode).toEqual(200);
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

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toBe(true);
  });

  test('it should NOT update the super-admin, stopped on verification, incorrect password format', async () => {
    const response = await request(app).put(`/super-admins/${superAdminId}`).send({
      firstName: 'Alex',
      lastName: 'Liases',
      email: 'a.liases@radiumrocket.com',
      password: 'testeandoPorAy',
      active: true,
    });

    expect(response.statusCode).toEqual(400);
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

    expect(response.statusCode).toEqual(400);
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

    expect(response.statusCode).toEqual(404);
    expect(response.body.error).toBe(true);
  });
});
