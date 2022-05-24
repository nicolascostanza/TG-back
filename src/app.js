import express from 'express';
import superAdminControllers from './controllers/super-admins';
import superAdminValidation from './validations/super-admins';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/super-admins', superAdminValidation.validateCreation, superAdminControllers.createSuperAdmin);
app.put('/super-admins/:id', superAdminValidation.validateUpdate, superAdminControllers.updateSuperAdmin);
app.get('/super-admins/:id', superAdminControllers.getSuperAById);

export default app;
