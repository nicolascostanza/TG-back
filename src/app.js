import express from 'express';
import superAdmins from './controllers/super-admins';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app
  .get('/super-admin', superAdmins.getAllSuperA)
  .delete('/super-admins/:id', superAdmins.deleteSuperAdmin);
export default app;
