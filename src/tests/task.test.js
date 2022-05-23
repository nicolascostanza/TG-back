import request from 'supertest';
import app from '../app';
import Tasks from '../models/Tasks';
import taskSeed from '../seeds/tasks';

beforeAll(async () => {
  await Tasks.collection.insertMany(taskSeed);
});

describe('POST /tasks Success', () => {
  test('Test created, status has to be 201', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project',
      taskCreatorId: '60a4a32s247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '60a4a32f24ae066e9495ce12',
        employeeRole: 'QA',
        employeeName: 'Employee',
      }],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(201);
  });

  test('Error has to be false', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project',
      taskCreatorId: '60a4a32s247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '60a4a32f24ae066e9495ce12',
        employeeRole: 'QA',
        employeeName: 'Employee',
      }],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.body.error).toBeFalsy();
  });

  test('Message for created test', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project',
      taskCreatorId: '60a4a32s247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '399128593',
        employeeRole: 'QA',
        employeeName: 'Employee',
      }],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.body.message).toEqual('Task has been created');
  });
});

describe('POST /tasks Missing required field', () => {
  test('Missing parentProject, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: '',
      taskCreatorId: '60a4a32s247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '60a4a32f24ae066e9495ce12',
        employeeRole: 'QA',
        employeeName: 'Employee',
      }],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing taskCreatorId, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project',
      taskCreatorId: '',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '60a4a32f24ae066e9495ce12',
        employeeRole: 'QA',
        employeeName: 'Employee',
      }],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing taskName, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project',
      taskCreatorId: '60a4a32s247e066e9495ce12',
      taskName: '',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '60a4a32f24ae066e9495ce12',
        employeeRole: 'QA',
        employeeName: 'Employee',
      }],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing startDate, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project',
      taskCreatorId: '60a4a32s247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '60a4a32f24ae066e9495ce12',
        employeeRole: 'QA',
        employeeName: 'Employee',
      }],
      startDate: '',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing employeeId, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project',
      taskCreatorId: '60a4a32s247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '',
        employeeRole: 'QA',
        employeeName: 'Employee',
      }],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing employeeRole, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project',
      taskCreatorId: '60a4a32s247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '60a4a32f24ae066e9495ce12',
        employeeRole: '',
        employeeName: 'Employee',
      }],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing employeeName, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project',
      taskCreatorId: '60a4a32s247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '60a4a32f24ae066e9495ce12',
        employeeRole: 'QA',
        employeeName: '',
      }],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });
});

describe('POST /tasks invalid field', () => {
  test('TaskName is too long', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project seed',
      taskCreatorId: '60a4a32s247e066e9495ce12',
      taskName: 'Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks', // More than 50 char
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '60a4a32f24ae066e9495ce12',
        employeeRole: 'QA',
        employeeName: 'Employee',
      }],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('TaskDescription is too long', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project seed',
      taskCreatorId: '60a4a32s247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: [{
        employeeId: '60a4a32f24ae066e9495ce12',
        employeeRole: 'QA',
        employeeName: 'Employee',
      }],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  describe('POST /tasks invalid field', () => {
    test('DD/MM/AAAA is a invalid date format', async () => {
      const response = await request(app).post('/tasks').send({
        parentProject: 'project seed',
        taskCreatorId: '60a4a32s247e066e9495ce12',
        taskName: 'Taks',
        taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
        assignedEmployee: [{
          employeeId: '60a4a32f24ae066e9495ce12',
          employeeRole: 'QA',
          employeeName: 'Employee',
        }],
        startDate: '05/20/2022',
        status: 'Ready to deliver',
      });
      expect(response.status).toBe(400);
    });
  });
});
