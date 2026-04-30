import { body, param, query } from 'express-validator';

export const listAlertsValidator = [
    query('status').optional().isIn(['active', 'acknowledged', 'resolved', 'dismissed']),
    query('severity').optional().isIn(['low', 'medium', 'high', 'critical']),
    query('type').optional().isString(),
];

export const alertIdValidator = [
    param('alertId').isMongoId().withMessage('Invalid alert ID'),
];
