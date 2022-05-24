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
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(201);
  });

  test('Error has to be false', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.body.error).toBeFalsy();
  });

  test('Message for created test', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.body.message).toEqual('Task has been created');
  });
});

describe('POST /tasks Missing required field', () => {
  test('Missing parentProject, cannot create the task, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: '',
      taskName: 'Task',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing parentProject, cannot create the task, clientError has to be true', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: '',
      taskName: 'Task',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('Missing taskName, cannot create the task, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: '',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing taskName, cannot create the task, clientError has to be true', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: '',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('Missing startDate, cannot create the task, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Task',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing startDate, cannot create the task, clientError has to be true', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Task',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('Missing status, cannot create the task, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Task',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: '',
    });
    expect(response.status).toBe(400);
  });

  test('Missing status, cannot create the task, clientError has to be true', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Task',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: '',
    });
    expect(response.clientError).toBeTruthy();
  });
});

describe('POST /tasks wrong route', () => {
  test('Route not exist, status has to be 404', async () => {
    const response = await request(app).post('/wrongRoute').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Task',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(404);
  });

  test('Route not exist, clientError has to be true', async () => {
    const response = await request(app).post('/wrongRoute').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Task',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });
});

describe('POST /tasks invalid field', () => {
  test('TaskName is too long, cannot create the task, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project seed',
      taskName: 'Task Task Task Task Task Task Taks Taks Taks Taks Taks Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('TaskName is too long, cannot create the task, clientError has to be true', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project seed',
      taskName: 'Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('TaskDescription is too long, cannot create the task, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project seed',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('TaskDescription is too long, cannot create the task, clientError has to be true', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project seed',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('DD/MM/AAAA is a invalid date format, cannot create the task, status has to be 400', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project seed',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('DD/MM/AAAA is a invalid date format cannot create the task, clientError has to be true', async () => {
    const response = await request(app).post('/tasks').send({
      parentProject: 'project seed',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });
});

describe('PUT /tasks Success', () => {
  test('Test updated, status has to be 200', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(200);
  });

  test('Error has to be false', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.body.error).toBeFalsy();
  });

  test('Message for updated test', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.body.message).toEqual('Task has been updated');
  });
});

describe('PUT /tasks Missing required field', () => {
  test('Missing parentProject, cannot update the task, status has to be 400', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: '',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing parentProject, cannot update the task, clientError has to be true', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: '',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('Missing taskName, cannot update the task, status has to be 400', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: '',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing taskName, cannot update the task, clientError has to be true', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: '',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('Missing startDate, cannot update the task, status has to be 400', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('Missing startDate, cannot update the task, clientError has to be true', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('Missing status, cannot create the task, status has to be 400', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: '',
    });
    expect(response.status).toBe(400);
  });

  test('Missing status, cannot create the task, clientError has to be true', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: '',
    });
    expect(response.clientError).toBeTruthy();
  });
});

describe('PUT /tasks wrong route', () => {
  test('Route not exist, status has to be 404', async () => {
    const response = await request(app).put('/wrongRoute').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(404);
  });

  test('Route not exist, clientError has to be true', async () => {
    const response = await request(app).put('/wrongRoute').send({
      parentProject: '68a4a32f247e066e9495ce12',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });
});

describe('PUT /tasks invalid field', () => {
  test('TaskName is too long, cannot update the task, status has to be 400', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: 'project seed',
      taskName: 'Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('TaskName is too long, cannot update the task, clientError has to be true', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: 'project seed',
      taskName: 'Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('TaskDescription is too cannot update the task, long, status has to be 400', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: 'project seed',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('TaskDescription is too cannot update the task, long, clientError has to be true', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: 'project seed',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description, Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '05/20/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });

  test('DD/MM/AAAA is a invalid date format, cannot update the task, status has to be 400', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: 'project seed',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.status).toBe(400);
  });

  test('DD/MM/AAAA is a invalid date format, cannot update the task, clientError has to be true', async () => {
    const response = await request(app).put('/tasks/60a4a32f247e066e9495ce12').send({
      parentProject: 'project seed',
      taskName: 'Taks',
      taskDescription: 'Lorem impsum tuki tuki lorem ipsum tuki tuki this is a description',
      assignedEmployee: ['60d4a32f257e066e8495ce12'],
      startDate: '20/05/2022',
      status: 'Ready to deliver',
    });
    expect(response.clientError).toBeTruthy();
  });
});
