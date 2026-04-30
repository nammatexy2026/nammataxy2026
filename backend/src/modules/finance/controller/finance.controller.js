import * as financeService from '../service/finance.service.js';
import { asyncHandler } from '../../../utils/asyncHandler.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export const getReconciliationData = asyncHandler(async (req, res) => {
  const data = await financeService.getFinanceReconciliation(req.query);
  sendSuccess(res, { data });
});

export const getFinanceSummary = asyncHandler(async (req, res) => {
  const summary = await financeService.getFinanceSummary(req.query);
  sendSuccess(res, { data: summary });
});

export const exportReconciliationCsv = asyncHandler(async (req, res) => {
  const data = await financeService.getFinanceReconciliation(req.query);
  
  const headers = [
    'Booking Ref', 'Date', 'Customer', 'Fare', 'Payment Status', 
    'Payment Amount', 'Refund Status', 'Refunded Amount', 
    'Earning Amount', 'Payout Status', 'Batch Ref', 'Business Net', 'Exceptions'
  ].join(',');

  const rows = data.map(row => [
    row.bookingRef,
    new Date(row.createdAt).toLocaleDateString(),
    `"${row.customer}"`,
    row.fare,
    row.paymentStatus,
    row.paymentAmount,
    row.refundStatus,
    row.refundedAmount,
    row.earningAmount,
    row.payoutStatus,
    row.payoutBatchRef,
    row.businessNet,
    `"${row.exceptions.join('|')}"`
  ].join(','));

  const csv = [headers, ...rows].join('\n');
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=finance_reconciliation_${Date.now()}.csv`);
  res.status(200).send(csv);
});
