/**
 * src/config/database.js
 *
 * MongoDB connection using Mongoose.
 *
 * This module:
 *   - Exports connectDB() to be called once at startup in server.js
 *   - Exports getConnectionState() for health checks
 *   - Configures connection-level event logging
 *   - Does NOT define any models — models live in src/modules/<module>/model/
 *
 * Why Mongoose over the native MongoDB driver:
 *   - Schema enforcement catches data shape errors early
 *   - Built-in validation, virtuals, and middleware hooks
 *   - Simpler connection management with connection pooling handled internally
 *   - Familiar ecosystem for Node.js taxi/booking apps
 */

import mongoose from 'mongoose';
import config from './env.js';
import logger from '../utils/logger.js';

// ── Mongoose global settings ──────────────────────────────────────────────────

// Throw errors on queries to undeclared schema paths (prevents silent data loss)
mongoose.set('strict', true);

// Return plain JS objects from .lean() calls — faster for read-heavy list endpoints
mongoose.set('strictQuery', false);

// ── Connection event hooks ────────────────────────────────────────────────────

mongoose.connection.on('connected', () => {
  logger.info('[DB] Mongoose connected to MongoDB', {
    host: mongoose.connection.host,
    db: mongoose.connection.name,
  });
});

mongoose.connection.on('disconnected', () => {
  logger.warn('[DB] Mongoose disconnected from MongoDB');
});

mongoose.connection.on('error', (err) => {
  logger.error('[DB] Mongoose connection error', { error: err.message });
});

// ── Connect ───────────────────────────────────────────────────────────────────

/**
 * Connect to MongoDB.
 * Called once during server boot (server.js).
 * Throws if the connection fails — caller decides whether to exit.
 *
 * @param {string} [uri] - Optional custom URI (useful for testing)
 * @returns {Promise<void>}
 */
export async function connectDB(uri) {
  const connectionUri = uri || config.db.uri;
  await mongoose.connect(connectionUri, {
    // Mongoose 8+ has sensible defaults; override here if needed
    serverSelectionTimeoutMS: 5000,  // Fail fast if MongoDB unreachable at startup
    socketTimeoutMS: 45000,
  });
}

/**
 * Close the Mongoose connection gracefully.
 * Called during SIGTERM / SIGINT shutdown.
 */
export async function disconnectDB() {
  await mongoose.connection.close();
  logger.info('[DB] Mongoose connection closed.');
}

/**
 * Return a human-readable connection state string.
 * Used by the health endpoint.
 *
 * Mongoose readyState values:
 *   0 = disconnected
 *   1 = connected
 *   2 = connecting
 *   3 = disconnecting
 */
export function getConnectionState() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[mongoose.connection.readyState] ?? 'unknown';
}

export default mongoose;
