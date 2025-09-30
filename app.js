import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { helmetConfig, rateLimitConfig } from './src/config/security.js';
import bookRoutes from './src/routes/bookRoutes.js';
import { notFoundHandler, errorHandler } from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files and body parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Security, logging, and performance middleware
app.use(helmet(helmetConfig));
app.use(morgan('dev'));
app.use(compression());
app.use(rateLimit(rateLimitConfig));

// Expose current path to views for active nav highlighting
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// Routes
app.use('/', bookRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
