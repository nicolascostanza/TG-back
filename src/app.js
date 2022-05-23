import express from 'express';
import adminsControllers from './controllers/admins';
import adminValidation from './validations/admins';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app
  .post('/admins/post', adminValidation.validateAdmin, adminsControllers.createAdmin)
  .put('/admins/put/:id', adminValidation.validateAdmin, adminsControllers.updateAdmin);

export default app;
