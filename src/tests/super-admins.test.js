import request from 'supertest';
import app from '../app';
import Superadmin from '../models/Superadmin';
import superAdminSeed from '../seeds/super-admin';

beforeAll(async () => {
  await Superadmin.collection.insertMany(superAdminSeed);
});

let superAdminId;

describe('POST /super-admins', () => {
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

describe('DELETE /super-admins', () => {
  test('it should successfully delete a super admin', async () => {
    const response = await request(app).get(`/super-admins/${superAdminId}`).send();

    expect(response).toEqual(200);
  });

  test('it should successfully delete a super admin', async () => {
    const response = await request(app).get(`/super-admins/${superAdminId}`).send();

    expect(response.body.message).toEqual(200);
  });
});
