import mongoose from "mongoose";
import Address from "../models/addressModel.js";
import { handleResponseError, handleResponseSuccess } from "../utils/responses.js";

export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({});
        handleResponseSuccess(res, 200, "Get addresses successfuly", { addresses })
    } catch (error) {
        handleResponseError(res, 500, "Internal server error")
        return
    }
}

export const createAddress = async (req, res) => {
    const { firstName, lastName, phoneNumber, email, country, stresh, city } = req.body;
    if (!firstName || !lastName || !phoneNumber || !email || !country || !stresh || !city) {
        handleResponseError(res, 400, "All fields are required")
        return
    } else {
        const newAddress = await Address.create({ firstName, lastName, phoneNumber, email, country, stresh, city });
        handleResponseSuccess(res, 201, "Create new address successfully", { ...newAddress._doc})
    }
}

export const updateAddress = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return 
    }
    const checkAddressByIdInDb = await Address.findById(id);
    if (!checkAddressByIdInDb) {
        handleResponseError(res, 404, "Address not found")
        return
    }
    const { firstName, lastName, phoneNumber, email, country, stresh, city } = req.body;
    if (!firstName || !lastName || !phoneNumber || !email || !country || !stresh || !city) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return
    }
    await checkAddressByIdInDb.updateOne({ firstName, lastName, phoneNumber, email, country, stresh, city })
    const updateAddress = await Address.findById(id);
    handleResponseSuccess(res, 200, "Update address successfully", {...updateAddress._doc})
}

export const deleteAddress = async (req, res) => {
    const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    handleResponseError(res, 400, "Incorrect format id")
    return
  }
  const checkAddressInDb = await Address.findById(id)
  if (!checkAddressInDb) {
    handleResponseError(res, 404, "Address not found")
    return
  }
  await Address.findByIdAndDelete(id)
  handleResponseSuccess(res, 200, "Address deleted successfully")
}