/**
 * src/app.js
 *
 * Express application factory.
 * Wires all middleware, routes, and error handlers.
 *
 * This is intentionally separated from server.js so the app
 * can be imported cleanly by test suites without binding to a port.
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import config from './config/env.js';
import logger from './utils/logger.js';

import { requestLogger } from './middleware/requestLogger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import healthRouter from './routes/health.js';
import v1Router from './routes/v1/index.js';

// ── Create app ────────────────────────────────────────────────────────────────

const app = express();

// ── Security middleware ───────────────────────────────────────────────────────

app.use(
  helmet({
    crossOriginEmbedderPolicy: false, // May conflict with some frontend assets
  }),
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile apps, server-to-server)
      if (!origin) return callback(null, true);
      if (config.cors.origins.includes(origin)) return callback(null, true);

      logger.warn('[CORS] Blocked origin', { origin });
      callback(new Error(`CORS: Origin ${origin} is not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),
);

// ── Global rate limiter ───────────────────────────────────────────────────────

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED',
  },
  skip: (req) => req.url === '/api/health',
});

app.use(limiter);

// ── Body parsing & compression ────────────────────────────────────────────────

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Request logging ───────────────────────────────────────────────────────────

app.use(requestLogger);

// ── Trust proxy (required if running behind Nginx/load balancer) ──────────────

if (config.isProduction) {
  app.set('trust proxy', 1);
}

// ── Routes ────────────────────────────────────────────────────────────────────

app.use('/api/health', healthRouter);
app.use('/api/v1', v1Router);

// Silence socket.io polling logs (if real-time engine not yet implemented)
app.use('/socket.io', (req, res) => {
  res.status(200).json({ success: true, message: 'Socket.io polling silenced' });
});

// Root info
app.get('/', (_req, res) => {
  res.json({
    name: 'Namma Taxi API',
    version: '1.0.0',
    status: 'running',
    docs: '/api/v1',
    health: '/api/health',
  });
});

// ── 404 + Error handlers (must be last) ──────────────────────────────────────

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
