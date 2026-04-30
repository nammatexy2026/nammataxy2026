import * as quoteService from '../service/quote.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export async function createQuote(req, res) {
  const quote = await quoteService.createQuote(req.body);
  return sendSuccess(res, {
    status: 201,
    message: 'Quote generated successfully',
    data: quote,
  });
}

export async function getQuote(req, res) {
  const quote = await quoteService.getQuoteById(req.params.id);
  return sendSuccess(res, {
    message: 'Quote retrieved',
    data: quote,
  });
}
