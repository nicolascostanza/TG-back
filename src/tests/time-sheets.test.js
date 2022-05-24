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
    expect(response.body.message).toEqual('The data for the timesheet with id 62832da494417525e9b7b0c2 has been sent');
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
  test('should return status 400', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c1').send();
    expect(response.status).toBe(400);
  });

  test('should return error true', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c1').send();
    expect(response.body.error).toBe(true);
  });

  test('should return data undefined', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c1').send();
    expect(response.body.data).toBeUndefined();
  });

  test('should return message', async () => {
    const response = await request(app).get('/time-sheets/62832da494417525e9b7b0c1').send();
    expect(response.body.message).toEqual('There is no timesheet with id 62832da494417525e9b7b0c1');
  });
});

describe('Succesful DELETE /time-sheets', () => {
  test('should return status 200, error true, data defined, and message', async () => {
    const response = await request(app).delete('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toEqual('The Timesheet has been successfully deleted');
  });
});

describe('Unsuccesful DELETE /time-sheets - timesheet not found', () => {
  test('should return status 404', async () => {
    const response = await request(app).delete('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.status).toBe(404);
  });

  test('should return data undefined', async () => {
    const response = await request(app).delete('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.data).toBeUndefined();
  });

  test('should return error true', async () => {
    const response = await request(app).delete('/time-sheets/62832da494417525e9b7b0c2').send();
    expect(response.body.error).toBe(true);
  });
});
