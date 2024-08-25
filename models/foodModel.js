import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    category: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: Object,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    rate: {
        type: String,
        require: true
    },
});

const Food = mongoose.model('foods', foodSchema);
export default Food;