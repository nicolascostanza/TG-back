import request from 'supertest';
import app from '../app';
import Admins from '../models/Admins';
import adminSeed from '../seeds/admins';

beforeAll(async () => {
  await Admins.collection.insertMany(adminSeed);
});

let adminId = '60d4a32f257e066e9495ce12';

describe('POST /Admins', () => {
  test('It should create a new admin, all fields filled and validated', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.status).toBe(201);
    expect(response.body.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    adminId = response.body.data._id;
  });

  test('It should show an admin created message', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.body.message).toEqual('Admin has been created');
    // eslint-disable-next-line no-underscore-dangle
    adminId = response.body.data._id;
  });

  test('It should create a new admin, FIRST NAME lenght passed validation', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.body.data.firstName.length).toBeGreaterThanOrEqual(3);
    expect(response.statusCode).toBe(201);
  });

  test('It should NOT create a new admin, FIRST NAME lenght did not pass validation', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Ch',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should create a new admin, LAST NAME lenght passed validation', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.body.data.lastName.length).toBeGreaterThanOrEqual(3);
    expect(response.statusCode).toBe(201);
  });

  test('It should NOT create a new admin, LAST NAME lenght did not pass validation', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Charles',
      lastName: 'Vi',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT create a new admin, EMAIL format did not pass validation', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorxgmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT create a new admin, PASSWORD lenght did not pass validation', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should create a new admin, STATUS boolean passed validation', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'false',
    });
    expect(response.statusCode).toBe(201);
  });

  test('It should NOT create a new admin, STATUS did not pass validation', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'anyword',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT create a new admin due to a missing field', async () => {
    const response = await request(app).post('/admins').send({
      firstName: 'Charles',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'false',
    });
    expect(response.statusCode).toBe(400);
  });
});

describe('PUT /Admins', () => {
  test('It should update the admin', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    // eslint-disable-next-line no-underscore-dangle
    adminId = response.body.data._id;
  });

  test('It should show an admin updated message', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.body.message).toEqual('Admin successfully updated');
    // eslint-disable-next-line no-underscore-dangle
    adminId = response.body.data._id;
  });

  test('It should update the admin, FIRST NAME lenght passed validation', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.body.data.firstName.length).toBeGreaterThanOrEqual(3);
    expect(response.statusCode).toBe(200);
  });

  test('It should NOT update the admin, FIRST NAME lenght did not validation', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Ch',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should update the admin, LAST NAME lenght passed validation', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.body.data.lastName.length).toBeGreaterThanOrEqual(3);
    expect(response.statusCode).toBe(200);
  });

  test('It should NOT update the admin, LAST NAME lenght did not pass validation', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Vi',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT update the admin, EMAIL format did not pass validation', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorxgmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT update the admin, PASSWORD lenght did not pass validation', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should update the admin, STATUS field passed validation', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'false',
    });
    expect(response.statusCode).toBe(200);
  });

  test('It should NOT update the admin, STATUS field did not passvalidation', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'anyword',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT update the admin due to a missing field', async () => {
    const response = await request(app).put(`/admins/${adminId}`).send({
      firstName: 'Charles',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'false',
    });
    expect(response.statusCode).toBe(400);
  });
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
    expect(response.body.message).toEqual('Admin successfully deleted');
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
