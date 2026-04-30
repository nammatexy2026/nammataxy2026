import { body, param, query } from 'express-validator';

export const createBatchValidator = [
    body('earningIds').isArray({ min: 1 }).withMessage('At least one earning ID is required'),
    body('earningIds.*').isMongoId().withMessage('Invalid earning ID'),
    body('notes').optional().isString().trim(),
];

export const batchIdValidator = [
    param('id').isMongoId().withMessage('Invalid batch ID'),
];

export const settleEarningValidator = [
    param('id').isMongoId().withMessage('Invalid earning ID'),
    body('notes').optional().isString().trim(),
];


export const listBatchesValidator = [
    query('status').optional().isIn(['draft', 'processed', 'cancelled']),
];
