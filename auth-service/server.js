// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();

// const app = express();
// app.use(express.json());

// app.get('/auth/health', (req, res) => res.json({ status: 'Auth Service OK' }));

// app.post('/auth/login', (req, res) => {
//   res.json({ message: 'Login successful (mock)', user: { id: 1, token: 'abc123' } });
// });

// app.listen(process.env.PORT || 5001, () => console.log(`Auth Service running on port:https://localhost:${process.env.PORT}`));


import express from 'express';
import dotenv from 'dotenv';
import Consul from 'consul';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = parseInt(process.env.PORT, 10) || 5000;

const consul = new Consul({ host: 'localhost', port: 8500, promisify: true });

const serviceId = `auth-service-${PORT}`;
consul.agent.service.register({
  id: serviceId,
  name: 'auth-service',
  address: 'localhost',
  port: PORT,
  check: {
    http: `http://localhost:${PORT}/auth/health`,
    interval: '10s'
  }
}, (err) => {
  if (err) console.error('Consul registration failed', err);
  else console.log(`Auth Service registered with Consul as ${serviceId}`);
});

app.get('/auth/health', (req, res) => res.json({ status: 'Auth Service OK' }));
app.post('/auth/login', (req, res) => {
  res.json({ message: 'Login successful (mock)', token: 'abc123' });
});

app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));
