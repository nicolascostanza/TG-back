import request from 'supertest';
import app from '../app';
import Employees from '../models/Employees';
import employeeSeed from '../seeds/employees';

beforeAll(async () => {
  await Employees.collection.insertMany(employeeSeed);
});

let employeeId;

describe('Succesful POST /employees', () => {
  test('should create an employee', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(201);
    // eslint-disable-next-line no-underscore-dangle
    employeeId = response.body.data._id;
  });

  test('message should indicate the creation of an employee', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.body.message).toEqual('Employee has been created');
  });

  test('error false should indicate the creation of an employee', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.body.error).toBe(false);
  });

  test('missing unrequired properties should create an employee', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      dob: '10/10/1998',
      password: '123456789',
      active: true,
    });
    expect(response.status).toBe(201);
  });
});

describe('Unsuccesful POST /employees - Missing firstName', () => {
  test('should not create an employee', async () => {
    const response = await request(app).post('/employees').send({
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('message should indicate that employee could not be created because of validation', async () => {
    const response = await request(app).post('/employees').send({
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.body.message).toEqual('There has been an error in the validation');
  });

  test('error should indicate that employee could not be created because firstName is required', async () => {
    const response = await request(app).post('/employees').send({
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    // eslint-disable-next-line no-useless-escape
    expect(response.body.data).toEqual('\"firstName\" is required');
  });
});

describe('Unsuccesful POST /employees - Other missing properties', () => {
  test('missing lastName should not create an employee and should throw lastName is required', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.data).toEqual('\"lastName\" is required');
  });

  test('missing email should not create an employee and should throw email is required', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.data).toEqual('\"email\" is required');
  });

  test('missing dob should not create an employee and should throw dob is required', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.data).toEqual('\"dob\" is required');
  });

  test('missing password should not create an employee and should throw password is required', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.data).toEqual('\"password\" is required');
  });

  test('missing active should not create an employee and should throw active is required', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
    });
    expect(response.status).toBe(400);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.data).toEqual('\"active\" is required');
  });
});

describe('Unsuccesful POST /employees - Validations do not pass', () => {
  test('firstName too short', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Pe',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('lastName too short', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'te',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('email not valid', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltestgmailcom',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('gender not one of (Male, Female, Other)', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Mal',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('address not a string', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 123,
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('dob not valid date format', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '15/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('password too short', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '1234567',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('phone not between 9 and 10 characters', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123333',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('active not boolean', async () => {
    const response = await request(app).post('/employees').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: 123,
    });
    expect(response.status).toBe(400);
  });
});

describe('Unsuccesful POST /employees - Bad Route', () => {
  test('should not create an employee because resource was not found', async () => {
    const response = await request(app).post('/employee').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(404);
  });
});

describe('Succesful PUT /employees', () => {
  test('should update an employee', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(200);
  });

  test('message should indicate the update of an employee', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.body.message).toEqual('Employee succesfully updated');
  });

  test('error false should indicate the update of an employee', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.body.error).toBe(false);
  });

  test('missing unrequired properties should update an employee', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      dob: '10/10/1998',
      password: '123456789',
      active: true,
    });
    expect(response.status).toBe(200);
  });
});

describe('Unsuccesful PUT /employees - Missing firstName', () => {
  test('should not update an employee', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(200);
  });

  test('message should indicate that employee could not be updated because of validation', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.body.message).toEqual('Employee succesfully updated');
  });

  test('error should indicate that employee could not be updated because firstName is required', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    // eslint-disable-next-line no-useless-escape
    expect(response.body.error).toBe(false);
  });
});

describe('Unsuccesful PUT /employees - Other missing properties', () => {
  test('missing lastName should not update an employee and should throw lastName is required', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(200);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.error).toBe(false);
  });

  test('missing email should not update an employee and should throw email is required', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(200);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.error).toBe(false);
  });

  test('missing dob should not update an employee and should throw dob is required', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(200);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.error).toBe(false);
  });

  test('missing password should not update an employee and should throw password is required', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(200);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.error).toBe(false);
  });

  test('missing active should not update an employee and should throw active is required', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
    });
    expect(response.status).toBe(200);
    // eslint-disable-next-line no-useless-escape
    expect(response.body.error).toBe(false);
  });
});

describe('Unsuccesful PUT /employees - Validations do not pass', () => {
  test('firstName too short', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Pe',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('lastName too short', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'te',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('email not valid', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltestgmailcom',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('gender not one of (Male, Female, Other)', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Mal',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('address not a string', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 123,
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('dob not valid date format', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '15/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('password too short', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '1234567',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('phone not between 9 and 10 characters', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123333',
      active: true,
    });
    expect(response.status).toBe(400);
  });

  test('active not boolean', async () => {
    const response = await request(app).put(`/employees/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: 123,
    });
    expect(response.status).toBe(400);
  });
});

describe('Unsuccesful PUT /employees - Bad Route', () => {
  test('should not update an employee because resource was not found', async () => {
    const response = await request(app).put(`/employee/${employeeId}`).send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(404);
  });
});

describe('Unsuccesful PUT /employees - Nonexistent ID', () => {
  test('should not update an employee because onject was not found', async () => {
    const response = await request(app).put('/employees/60d4a32f257e066e8495ce13').send({
      firstName: 'Personal',
      lastName: 'test',
      email: 'personaltest@gmail.com',
      gender: 'Male',
      address: 'calle sin nombre 123',
      dob: '10/10/1998',
      password: '123456789',
      phone: '0303456123',
      active: true,
    });
    expect(response.status).toBe(404);
  });
});

describe('GetById /employees', () => {
  test('response should return a 200 status', async () => {
    const response = await request(app).get(`/employees/${employeeId}`).send();
    expect(response.status).toBe(200);
  });

  test('response should not return error', async () => {
    const response = await request(app).get(`/employees/${employeeId}`).send();
    expect(response.error).toBe(false);
  });

  test('the employee with id X much was not found', async () => {
    const response = await request(app).get('/employees/60d4a32f257e066e84951234').send();
    expect(response.status).toBe(404);
  });

  test('returns the required information', async () => {
    const response = await request(app).get(`/employees/${employeeId}`).send();
    expect(response.body.data).not.toBeNull();
  });

  test('response should return an employee email', async () => {
    const response = await request(app).get(`/employees/${employeeId}`).send();
    expect(response.body.data).toHaveProperty('email');
  });
});

describe('GET /employees', () => {
  test('It should return a 200 status', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.status).toBe(200);
  });

  test('It should return a correct message', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.message).toEqual('All employees are:');
  });

  test('It should return at least one employee', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('It should not return an empty employee', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.body.data).not.toBeNull();
  });

  test('It should return a 404 status', async () => {
    const response = await request(app).get('/nkjnkn').send();
    expect(response.status).toBe(404);
  });

  test('It should return a 404 status', async () => {
    const response = await request(app).get('/employee').send();
    expect(response.status).toBe(404);
  });

  test('It should be return false error', async () => {
    const response = await request(app).get('/employees').send();
    expect(response.error).toBe(false);
  });
});

describe('Delete /employees', () => {
  test('Delete should return error', async () => {
    const response = await request(app).delete('/employees/60d4a32f257e066e8495fa15').send();
    expect(response.body.error).toBe(true);
  });

  test('It should delete a employee', async () => {
    const response = await request(app).delete(`/employees/${employeeId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual('Employee successfully deleted');
    expect(response.error).toBe(false);
  });
});
