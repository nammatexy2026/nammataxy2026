import Address from '../model/address.model.js';
import { AppError } from '../../../utils/AppError.js';

export async function createAddress(customerId, data) {
  return Address.create({ ...data, customerId });
}

export async function getAddressesByCustomerId(customerId) {
  return Address.find({ customerId }).sort({ createdAt: -1 });
}

export async function updateAddress(customerId, addressId, data) {
  const address = await Address.findOneAndUpdate(
    { _id: addressId, customerId },
    data,
    { new: true, runValidators: true }
  );
  if (!address) throw AppError.notFound('Address not found');
  return address;
}

export async function deleteAddress(customerId, addressId) {
  const result = await Address.findOneAndDelete({ _id: addressId, customerId });
  if (!result) throw AppError.notFound('Address not found');
  return true;
}
