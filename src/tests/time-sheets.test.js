import request from 'supertest';
import app from '../app';

import Tsheets from '../models/Time-sheets';
import Employees from '../models/Employees';
import Tasks from '../models/Tasks';

import timeSheetSeed from '../seeds/time-sheets';
import employeeSeed from '../seeds/employees';
import taskSeed from '../seeds/tasks';

beforeAll(async () => {
  await Tsheets.collection.insertMany(timeSheetSeed);
  await Employees.collection.insertMany(employeeSeed);
  await Tasks.collection.insertMany(taskSeed);
});

describe('POST /time-sheets', () => {
  test('It should create a timesheet and the status should be 201', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: ['60a4a32f247e066e9495ce12'],
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(201);
  });

  test('It should be return false error', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.body.error).toBeFalsy();
  });

  test('It should be return a message for created time-sheet', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: ['60a4a32f247e066e9495ce12'],
      approved: 'true',
      role: 'DEV',
    });
    expect(response.body.message).toEqual('Time-sheet has been created');
  });

  test('It cannot create a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot create a timesheet: the request is missing employeeId. ClientError should to be true', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot create a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: '',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot create a timesheet: the request is missing the project. ClientError should to be true', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: '',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot create a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot create a timesheet: the request is missing the date. ClientError should to be true', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot create a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot create a timesheet: the request is missing the hours. ClientError should to be true', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot create a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: '',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot create a timesheet: the request is missing the approved status. ClientError should to be true', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: '',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot create a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: '',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot create a timesheet: the request is missing the role. ClientError should to be true', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: '',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('Route does not exist. The status should be 404', async () => {
    const response = await request(app).post('/xvxvxm').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(404);
  });

  test('Route does not exist. clientError has to be true', async () => {
    const response = await request(app).post('/xvxvxm').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot create the timesheet because he description is too short, status should to be 400', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Lo',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot create the timesheet because he description is too short, clientError should to be true', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Lo',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot create the timesheet because he description is too long, status should to be 400', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Lorem impsum lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot create the timesheet because he description is too long, status has to be 400, clientError should to be true', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Lorem impsum lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot create the timesheet because the date format is invalid, status should to be 400', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '24/25/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot create the timesheet because the date format is invalid, clientError has to be true', async () => {
    const response = await request(app).post('/time-sheets').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '24/25/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });
});

describe('PUT /time-sheets', () => {
  test('It should update the timesheet and the status should be 200', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: ['60a4a32f247e066e9495ce12'],
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(200);
  });

  test('It should be return false error', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: ['60a4a32f247e066e9495ce12'],
      approved: 'true',
      role: 'DEV',
    });
    expect(response.body.error).toBeFalsy();
  });

  test('It cannot update a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot update a timesheet: the request is missing employeeId. ClientError should to be true', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot update a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: '',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot update a timesheet: the request is missing the project. ClientError should to be true', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: '',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot update a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot update a timesheet: the request is missing the date. ClientError should to be true', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot update a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot update a timesheet: the request is missing the hours. ClientError should to be true', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot update a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: '',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot update a timesheet: the request is missing the approved status. ClientError should to be true', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: '',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot update a timesheet: the request is missing required field. The status should be 400', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: '',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot update a timesheet: the request is missing the role. ClientError should to be true', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: '',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('Route does not exist. The status should be 404', async () => {
    const response = await request(app).post('/xvxvxm').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(404);
  });

  test('Route does not exist. clientError has to be true', async () => {
    const response = await request(app).post('/xvxvxm').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot update the timesheet because he description is too short, status should to be 400', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Lo',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot update the timesheet because he description is too short, clientError should to be true', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Lo',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot update the timesheet because he description is too long, status should to be 400', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Lorem impsum lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot update the timesheet because he description is too long, status has to be 400, clientError should to be true', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Lorem impsum lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      project: 'project a ',
      date: '05/24/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('It cannot update the timesheet because the date format is invalid, status should to be 400', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '24/25/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.status).toBe(400);
  });

  test('It cannot update the timesheet because the date format is invalid, clientError has to be true', async () => {
    const response = await request(app).put('/time-sheets/62832da494417525e9b7b0c2').send({
      employeeId: '60d4a32f257e066e8495ce12',
      description: 'Hi, i am a descrption',
      project: 'project a ',
      date: '24/25/2022',
      hours: '50',
      task: '60a4a32f247e066e9495ce12',
      approved: 'true',
      role: 'DEV',
    });
    expect(response.clientError).toBeTruthy();
  });
});

describe('GET /time-sheets', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/time-sheets').send();
    expect(response.status).toBe(200);
  });

  test('response should return a false error', async () => {
    const response = await request(app).get('/time-sheets').send();
    expect(response.error).toBe(false);
  });

  test('response should return an error, bad path', async () => {
    const response = await request(app).get('/asdasd').send();
    expect(response.status).toBe(404);
  });

  test('response should return at least one Time-sheet', async () => {
    const response = await request(app).get('/time-sheets').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('response should return a successful message', async () => {
    const response = await request(app).get('/time-sheets').send();
    expect(response.body.message).toEqual('All Time-sheets are:');
  });
});

describe('Succesful GET by Id /time-sheets', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.status).toBe(200);
  });

  test('should return error false', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.error).toBe(false);
  });

  test('should return data not undefined', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.data).toBeDefined();
  });

  test('should return message', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.message).toEqual('Time-sheet with ID:62832da494417525e9b7b0c2 sent:');
  });

  test('should return _id property', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.data).toHaveProperty('_id');
  });

  test('should return employeeId property', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.data).toHaveProperty('employeeId');
  });

  test('should return project property', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.data).toHaveProperty('project');
  });

  test('should return date property', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.data).toHaveProperty('date');
  });

  test('should return hours property', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.data).toHaveProperty('hours');
  });

  test('should return task property', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.data).toHaveProperty('task');
  });

  test('should return approved property', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.data).toHaveProperty('approved');
  });

  test('should return role property', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.data).toHaveProperty('role');
  });
});

describe('Unsuccesful GET by Id /time-sheets - Wrong Id', () => {
  test('should return status 404 not found', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c1').send();
    expect(response.status).toBe(404);
  });

  test('should return error true', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c1').send();
    expect(response.body.error).toBe(true);
  });

  test('should return data undefined', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c1').send();
    expect(response.body.data.length).toBeUndefined();
  });

  test('should return message', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c1').send();
    expect(response.body.message).toEqual('Time-sheet with ID:62832da494417525e9b7b0c1 not found');
  });
});

describe('Succesful PATCH /time-sheets', () => {
  test('should return status 200, error true, data defined, and message', async () => {
    const response = await request(app).patch('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toEqual('Time-sheet successfully deleted');
  });
});

describe('Unsuccesful DELETE /time-sheets - timesheet not found', () => {
  test('should return status 404', async () => {
    const response = await request(app).patch('/time-sheets/62832da494417525e9b7b0c7').send();
    expect(response.status).toBe(404);
  });

  test('should return data empty object', async () => {
    const response = await request(app).patch('/time-sheets/62832da494417525e9b7b0c7').send();
    expect(response.body.data.length).toBeUndefined();
  });

  test('should return error true', async () => {
    const response = await request(app).patch('/time-sheets/62832da494417525e9b7b0c7').send();
    expect(response.body.error).toBe(true);
  });
});
