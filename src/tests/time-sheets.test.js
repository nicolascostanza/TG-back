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

describe('GET /time-sheets', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get('/time-sheets').send();
    expect(response.status).toBe(200);
  });

  test('response should return a false error', async () => {
    const response = await request(app).get('/time-sheets').send();
    expect(response.error).toBe(false);
  });

  // como puedo hacer para probar que funcione el error 400?

  /*   test('response should return a 400 status', async () => {
    const response = await request(app).get('/time-sheets/').send();
    expect(response.status).toBe(400);
  }); */

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
    expect(response.body.message).toEqual('Data for all Time-sheets sent');
  });
});
