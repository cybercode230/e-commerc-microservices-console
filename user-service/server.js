// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();

// const app = express();
// app.use(express.json());

// // Mock e-commerce users data
// const users = [
//   {
//     id: 1,
//     name: 'Alice Johnson',
//     email: 'alice@example.com',
//     role: 'customer',
//     address: '123 Main St, Kigali, Rwanda',
//     phone: '+250788123456',
//     cart: [
//       { productId: 101, name: 'Laptop', quantity: 1, price: 1200 },
//       { productId: 102, name: 'Headphones', quantity: 2, price: 50 },
//     ],
//     orders: [
//       { orderId: 5001, total: 1300, status: 'delivered' },
//       { orderId: 5002, total: 200, status: 'pending' },
//     ],
//   },
//   {
//     id: 2,
//     name: 'Bob Smith',
//     email: 'bob@example.com',
//     role: 'customer',
//     address: '456 Market St, Kigali, Rwanda',
//     phone: '+250788654321',
//     cart: [
//       { productId: 103, name: 'Smartphone', quantity: 1, price: 800 },
//     ],
//     orders: [
//       { orderId: 5003, total: 800, status: 'shipped' },
//     ],
//   },
// ];

// // Health check
// app.get('/user/health', (req, res) => res.json({ status: 'User Service OK' }));

// // Retrieve user by ID
// app.get('/user/:id', (req, res) => {
//   const user = users.find(u => u.id === parseInt(req.params.id));
//   if (!user) return res.status(404).json({ message: 'User not found' });
//   res.json(user);
// });

// // Retrieve all users
// app.get('/users', (req, res) => {
//   res.json(users);
// });

// // Retrieve mock "current" user (like logged-in user)
// app.post('/user/me', (req, res) => {
//   // For simplicity, always return the first user
//   const user = users[0];
//   res.json({ message: 'User retrieved successfully (mock)', user });
// });

// // Start server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`User Service running on port: https://localhost:${PORT}`));

import express from 'express';
import dotenv from 'dotenv';
import Consul from 'consul';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = parseInt(process.env.PORT, 10) || 5001;

// Setup Consul client
const consul = new Consul({ host: 'localhost', port: 8500, promisify: true });

// Register service with Consul
const serviceId = `user-service-${PORT}`;
consul.agent.service.register({
  id: serviceId,
  name: 'user-service',
  address: 'localhost',
  port: PORT,
  check: {
    http: `http://localhost:${PORT}/user/health`,
    interval: '10s'
  }
}, (err) => {
  if (err) console.error('Consul registration failed', err);
  else console.log(`User Service registered with Consul as ${serviceId}`);
});

// Mock user data
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' }
];

// Endpoints
app.get('/user/health', (req, res) => res.json({ status: 'User Service OK' }));
app.get('/users', (req, res) => res.json(users));

app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
