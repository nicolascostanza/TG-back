import express from 'express';
import adminsControllers from './controllers/admins';
import adminValidation from './validations/admins';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app
  .post('/', adminValidation.validateAdmin, adminsControllers.createAdmin)
  .put('/:id', adminValidation.validateAdminUpd, adminsControllers.updateAdmin);

export default app;