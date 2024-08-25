import mongoose from "mongoose";
import url from "url";
import { handleResponseError, handleResponseSuccess } from "../utils/responses.js";
import Food from "../models/foodModel.js";
import cloudinary from "../utils/cloudinary.js";

export const getFoodCategory = async (req, res) => {
    try {
        const foodCategory = await Food.find({category})
        handleResponseSuccess(res, 200, {foodCategory})
    } catch (error) {
        console.log(error)
    }
}

export const getFoods = async(req, res) => {
    try {
        const foods = await Food.find()
        handleResponseSuccess(res, 200, "Get foods successfully", { foods })
    } catch (error) {
        handleResponseError(res, 500, "Internal server error")
        return
    }
}

export const getFoodDetail = async( req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return 
    }
    const checkFoodByIdInDb = await Food.findById(id);
    if (!checkFoodByIdInDb) {
        handleResponseError(res, 404, "Food not found")
        return
    }
    handleResponseSuccess(res, 200, "Get food successfully", {
        _id: checkFoodByIdInDb._id,
        category: checkFoodByIdInDb.category,
        name: checkFoodByIdInDb.name,
        image: checkFoodByIdInDb.image,
        description: checkFoodByIdInDb.description,
        price: checkFoodByIdInDb.price,
        rate: checkFoodByIdInDb.rate
    })
}

export const createFood = async (req, res) => {
    const { category, name, image, description, price, rate } = req.body;
    if (!category || !name || !description || !price || !rate) {
        handleResponseError(res, 400, "All fields are required")
        return
    }

    if (image) {
        const uploadRes = await cloudinary.uploader.upload(image, {
            upload_preset: "foodWeb"
        })

        if (uploadRes) {
            const newFood = await Food.create({ category, name, image: uploadRes, description, price, rate });
            handleResponseSuccess(res, 201, "Create new food successfully", {...newFood._doc})
        }
    }

}

export const updateFood = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        handleResponseError(res, 400, "Incorrect format id")
        return 
    }
    const checkFoodByIdInDb = await Food.findById(id);
    if (!checkFoodByIdInDb) {
        handleResponseError(res, 404, "Food not found")
        return
    }
    const { category, name, image, description, price, rate } = req.body;
    if (!category || !name || !description || !price || !rate) {
        handleResponseError(res, 400, "Bad request. All fields are required")
        return
    }

    if (image) {
        const uploadRes = await cloudinary.uploader.upload(image, {
            upload_preset: "foodWeb"
        })

        if (uploadRes) {
            await checkFoodByIdInDb.updateOne({ category, name, image: uploadRes, description, price, rate })
        
            const updateFood = await Food.findById(id);
            handleResponseSuccess(res, 200, "Update food successfully", {...updateFood._doc})
        }
    }
}

export const deleteFood = async (req, res) => {
    const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    handleResponseError(res, 400, "Incorrect format id")
    return
  }
  const checkMovieInDb = await Food.findById(id)
  if (!checkMovieInDb) {
    handleResponseError(res, 404, "Movie not found")
    return
  }
  await Food.findByIdAndDelete(id)
  handleResponseSuccess(res, 200, "Food deleted successfully")
}
