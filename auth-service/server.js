import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.get('/auth/health', (req, res) => res.json({ status: 'Auth Service OK' }));

app.post('/auth/login', (req, res) => {
  res.json({ message: 'Login successful (mock)', user: { id: 1, token: 'abc123' } });
});

app.listen(process.env.PORT || 5001, () => console.log(`Auth Service running on port:https://localhost:${process.env.PORT}`));
