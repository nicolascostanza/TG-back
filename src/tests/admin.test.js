import request from 'supertest';
import adminSeed from '../seeds/admin';
import Admins from '../models/Admins';
import app from '../app';

beforeAll(async () => {
  await Admins.collection.insertMany(adminSeed);
});

let adminId;

describe('POST /Admins', () => {
  test('It should create a new admin, all fields filled and validated', async () => {
    const response = await request(app).post('/admins/post').send({
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
    const response = await request(app).post('/admins/post').send({
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
    const response = await request(app).post('/admins/post').send({
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
    const response = await request(app).post('/admins/post').send({
      firstName: 'Ch',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should create a new admin, LAST NAME lenght passed validation', async () => {
    const response = await request(app).post('/admins/post').send({
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
    const response = await request(app).post('/admins/post').send({
      firstName: 'Charles',
      lastName: 'Vi',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT create a new admin, EMAIL format did not pass validation', async () => {
    const response = await request(app).post('/admins/post').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorxgmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT create a new admin, PASSWORD lenght did not pass validation', async () => {
    const response = await request(app).post('/admins/post').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should create a new admin, STATUS boolean passed validation', async () => {
    const response = await request(app).post('/admins/post').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'false',
    });
    expect(response.statusCode).toBe(201);
  });

  test('It should NOT create a new admin, STATUS did not pass validation', async () => {
    const response = await request(app).post('/admins/post').send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'anyword',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT create a new admin due to a missing field', async () => {
    const response = await request(app).post('/admins/post').send({
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
    const response = await request(app).put(`/admins/put/${adminId}`).send({
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
    const response = await request(app).put(`/admins/put/${adminId}`).send({
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
    const response = await request(app).put(`/admins/put/${adminId}`).send({
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
    const response = await request(app).put(`/admins/put/${adminId}`).send({
      firstName: 'Ch',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should update the admin, LAST NAME lenght passed validation', async () => {
    const response = await request(app).put(`/admins/put/${adminId}`).send({
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
    const response = await request(app).put(`/admins/put/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Vi',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT update the admin, EMAIL format did not pass validation', async () => {
    const response = await request(app).put(`/admins/put/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorxgmail.com',
      password: '123456789',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT update the admin, PASSWORD lenght did not pass validation', async () => {
    const response = await request(app).put(`/admins/put/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123',
      active: 'true',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should update the admin, STATUS field passed validation', async () => {
    const response = await request(app).put(`/admins/put/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'false',
    });
    expect(response.statusCode).toBe(200);
  });

  test('It should NOT update the admin, STATUS field did not passvalidation', async () => {
    const response = await request(app).put(`/admins/put/${adminId}`).send({
      firstName: 'Charles',
      lastName: 'Xavier',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'anyword',
    });
    expect(response.statusCode).toBe(400);
  });

  test('It should NOT update the admin due to a missing field', async () => {
    const response = await request(app).put(`/admins/put/${adminId}`).send({
      firstName: 'Charles',
      email: 'professorx@gmail.com',
      password: '123456789',
      active: 'false',
    });
    expect(response.statusCode).toBe(400);
  });
});
