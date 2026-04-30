/**
 * src/utils/logger.js
 *
 * Winston-based structured logger.
 * - Console output in development (coloured, human-readable)
 * - JSON file output in production (daily rotate, suitable for log aggregators)
 */

import winston from 'winston';
import 'winston-daily-rotate-file';
import { mkdirSync } from 'fs';
import config from '../config/env.js';

// Ensure log directory exists
try {
  mkdirSync(config.logging.dir, { recursive: true });
} catch {
  // If we can't create log dir, console will still work
}

const { combine, timestamp, colorize, printf, json, errors } = winston.format;

// Human-readable format for console
const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'HH:mm:ss' }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level}]: ${message}${metaStr}`;
  }),
);

// Structured JSON format for files
const fileFormat = combine(
  timestamp(),
  errors({ stack: true }),
  json(),
);

const transports = [
  new winston.transports.Console({
    format: consoleFormat,
    silent: config.env === 'test',
  }),
];

if (config.isProduction) {
  transports.push(
    new winston.transports.DailyRotateFile({
      filename: `${config.logging.dir}/error-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      format: fileFormat,
      maxFiles: '14d',
      zippedArchive: true,
    }),
    new winston.transports.DailyRotateFile({
      filename: `${config.logging.dir}/combined-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      format: fileFormat,
      maxFiles: '14d',
      zippedArchive: true,
    }),
  );
}

const logger = winston.createLogger({
  level: config.logging.level,
  transports,
  exitOnError: false,
});

export default logger;
