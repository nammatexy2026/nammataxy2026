import * as addressService from '../service/address.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export async function createAddress(req, res) {
  const address = await addressService.createAddress(req.user.userId, req.body);
  return sendSuccess(res, {
    status: 201,
    message: 'Address created',
    data: address,
  });
}

export async function getMyAddresses(req, res) {
  const addresses = await addressService.getAddressesByCustomerId(req.user.userId);
  return sendSuccess(res, {
    message: 'Addresses retrieved',
    data: addresses,
  });
}

export async function updateAddress(req, res) {
  const address = await addressService.updateAddress(req.user.userId, req.params.id, req.body);
  return sendSuccess(res, {
    message: 'Address updated',
    data: address,
  });
}

export async function deleteAddress(req, res) {
  await addressService.deleteAddress(req.user.userId, req.params.id);
  return sendSuccess(res, {
    message: 'Address deleted',
  });
}
