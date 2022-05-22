import express from 'express';
import adminRoutes from './controllers/admins';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/admins/:id', adminRoutes.getAdminById);
app.delete('/admins/:id', adminRoutes.deleteAdmin);

export default app;
