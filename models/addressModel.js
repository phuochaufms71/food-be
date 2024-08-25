import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    stresh: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    }
})

const Address = mongoose.model('address', addressSchema);
export default Address;