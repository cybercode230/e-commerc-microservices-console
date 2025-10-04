import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

// Define service URLs
const SERVICES = {
  auth: 'http://localhost:5000',   // Auth service
  user: 'http://localhost:5001',   // User service
};

// Generic proxy handler
async function proxyRequest(serviceUrl, req, res) {
  const url = `${serviceUrl}${req.originalUrl}`;
  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
      headers: req.headers,  // forward headers if needed
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    if (err.response) {
      // Forward the error from the service
      res.status(err.response.status).json(err.response.data);
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}

// Route /auth requests to Auth Service
app.use('/auth', (req, res) => proxyRequest(SERVICES.auth, req, res));

// Route /user requests to User Service
app.use('/user', (req, res) => proxyRequest(SERVICES.user, req, res));

// Gateway health check
app.get('/health', (req, res) => res.json({ status: 'API Gateway OK' }));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`API Gateway running on port: https://localhost:${PORT}`));
