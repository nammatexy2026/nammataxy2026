/**
 * src/routes/health.js
 *
 * GET /api/health
 *
 * Liveness + readiness check endpoint.
 *
 * Returns:
 *   200 — server is up AND MongoDB is connected
 *   503 — server is up BUT MongoDB is NOT connected
 *
 * Response shape:
 *   {
 *     status: 'ok' | 'degraded',
 *     timestamp: ISO string,
 *     uptime: seconds (integer),
 *     environment: 'development' | 'production',
 *     version: '1.0.0',
 *     services: {
 *       database: {
 *         status: 'connected' | 'disconnected' | 'connecting' | 'disconnecting',
 *         name: '<db name>',
 *       }
 *     },
 *     responseTimeMs: number
 *   }
 *
 * Notes:
 *   - This endpoint is intentionally NOT rate-limited (see app.js skip config)
 *   - Does not run any DB query — checks Mongoose readyState directly (zero overhead)
 *   - Safe to call from load balancers at high frequency
 */

import { Router } from 'express';
import mongoose from 'mongoose';
import { getConnectionState } from '../config/database.js';
import config from '../config/env.js';

const router = Router();

router.get('/', (req, res) => {
  const start = Date.now();

  const dbState = getConnectionState();
  const isHealthy = dbState === 'connected';

  const body = {
    status: isHealthy ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    environment: config.env,
    version: '1.0.0',
    services: {
      database: {
        status: dbState,
        name: mongoose.connection.name || 'unknown',
      },
    },
    responseTimeMs: Date.now() - start,
  };

  return res.status(isHealthy ? 200 : 503).json(body);
});

export default router;
