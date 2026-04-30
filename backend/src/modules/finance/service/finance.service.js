import Booking from '../../bookings/model/booking.model.js';
import DriverEarning from '../../drivers/model/earning.model.js';
import Payment from '../../payments/model/payment.model.js';
import Refund from '../../payments/model/refund.model.js';
import SettlementBatch from '../../drivers/model/settlementBatch.model.js';
import mongoose from 'mongoose';

/**
 * Get unified finance reconciliation data
 */
export async function getFinanceReconciliation(filters = {}) {
  const { 
    range = 'all', 
    paymentStatus, 
    settlementStatus, 
    search, 
    exceptionOnly = false 
  } = filters;

  const dateFilter = getDateFilter(filters);
  const matchFilter = { ...dateFilter };

  if (paymentStatus) matchFilter.paymentStatus = paymentStatus;
  if (search) {
    matchFilter.$or = [
      { bookingRef: { $regex: search, $options: 'i' } },
      { 'customerInfo.phone': { $regex: search, $options: 'i' } }
    ];
  }

  // Use aggregation to join all financial records
  const pipeline = [
    { $match: matchFilter },
    // Join Payments
    {
      $lookup: {
        from: 'payments',
        localField: '_id',
        foreignField: 'bookingId',
        as: 'paymentData'
      }
    },
    { $addFields: { payment: { $arrayElemAt: ['$paymentData', 0] } } },
    // Join Refunds
    {
      $lookup: {
        from: 'refunds',
        localField: '_id',
        foreignField: 'bookingId',
        as: 'refundData'
      }
    },
    { $addFields: { refund: { $arrayElemAt: ['$refundData', 0] } } },
    // Join Driver Earnings
    {
      $lookup: {
        from: 'driverearnings',
        localField: '_id',
        foreignField: 'bookingId',
        as: 'earningData'
      }
    },
    { $addFields: { earning: { $arrayElemAt: ['$earningData', 0] } } },
    // Join Settlement Batches (if earning exists)
    {
      $lookup: {
        from: 'settlementbatches',
        localField: 'earning.payoutBatchId',
        foreignField: '_id',
        as: 'batchData'
      }
    },
    { $addFields: { batch: { $arrayElemAt: ['$batchData', 0] } } },
    // Project final reconciliation row
    {
      $project: {
        _id: 1,
        bookingRef: 1,
        createdAt: 1,
        status: 1,
        customer: '$customerInfo.name',
        customerPhone: '$customerInfo.phone',
        fare: '$fareDetails.computedFare',
        paymentStatus: 1,
        paymentMethod: 1,
        paymentAmount: { $ifNull: ['$payment.amount', 0] },
        refundStatus: { $ifNull: ['$refund.status', 'none'] },
        refundedAmount: { $ifNull: ['$refund.amount', 0] },
        earningAmount: { $ifNull: ['$earning.earningAmount', 0] },
        payoutStatus: { $ifNull: ['$earning.settlementStatus', 'none'] },
        payoutBatchRef: { $ifNull: ['$batch.batchRef', 'N/A'] },
        payoutBatchId: { $ifNull: ['$batch._id', null] }
      }
    },
    // Add business net calculation
    {
      $addFields: {
        businessNet: {
          $subtract: [
            { $subtract: ['$paymentAmount', '$refundedAmount'] },
            '$earningAmount'
          ]
        }
      }
    },
    // Add exception detection
    {
      $addFields: {
        exceptions: {
          $filter: {
            input: [
              {
                $cond: [
                  { $and: [
                    { $eq: ['$status', 'completed'] },
                    { $eq: ['$paymentStatus', 'paid'] },
                    { $eq: ['$earningAmount', 0] }
                  ]},
                  'MISSING_EARNING',
                  null
                ]
              },
              {
                $cond: [
                  { $and: [
                    { $eq: ['$refundStatus', 'processed'] },
                    { $eq: ['$payoutStatus', 'settled'] }
                  ]},
                  'REFUNDED_BUT_PAID_DRIVER',
                  null
                ]
              },
              {
                $cond: [
                  { $and: [
                    { $eq: ['$status', 'completed'] },
                    { $ne: ['$paymentStatus', 'paid'] }
                  ]},
                  'COMPLETED_WITHOUT_PAYMENT',
                  null
                ]
              }
            ],
            as: 'exc',
            cond: { $ne: ['$$exc', null] }
          }
        }
      }
    },
    { $sort: { createdAt: -1 } }
  ];

  if (settlementStatus) {
    pipeline.push({ $match: { payoutStatus: settlementStatus } });
  }

  if (exceptionOnly) {
    pipeline.push({ $match: { 'exceptions.0': { $exists: true } } });
  }

  return Booking.aggregate(pipeline);
}

/**
 * Get high-level finance health metrics
 */
export async function getFinanceSummary(filters = {}) {
  const reconciliation = await getFinanceReconciliation(filters);
  
  const summary = {
    grossInflow: 0,
    refundOutflow: 0,
    driverPayouts: 0,
    pendingPayoutLiability: 0,
    netProfit: 0,
    exceptionCount: 0
  };

  reconciliation.forEach(row => {
    summary.grossInflow += row.paymentAmount;
    summary.refundOutflow += row.refundedAmount;
    if (row.payoutStatus === 'settled') {
      summary.driverPayouts += row.earningAmount;
    } else if (row.payoutStatus === 'pending') {
      summary.pendingPayoutLiability += row.earningAmount;
    }
    
    summary.netProfit += row.businessNet;
    if (row.exceptions.length > 0) summary.exceptionCount++;
  });

  return summary;
}

/**
 * Helper for date filtering
 */
function getDateFilter(filters = {}) {
  const { range = 'all', fromDate, toDate } = filters;
  const now = new Date();
  const filter = {};

  if (fromDate || toDate) {
    filter.createdAt = {};
    if (fromDate) filter.createdAt.$gte = new Date(fromDate);
    if (toDate) {
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);
      filter.createdAt.$lte = end;
    }
    return filter;
  }

  if (range === 'today') {
    const start = new Date(now.setHours(0, 0, 0, 0));
    filter.createdAt = { $gte: start };
  } else if (range === '7d') {
    const start = new Date(now.setDate(now.getDate() - 7));
    filter.createdAt = { $gte: start };
  } else if (range === '30d') {
    const start = new Date(now.setDate(now.getDate() - 30));
    filter.createdAt = { $gte: start };
  }

  return filter;
}
