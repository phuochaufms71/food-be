import Message from "../models/messageModel.js";
import { handleResponseError, handleResponseSuccess } from "../utils/responses.js";
import sendMail from "../utils/send.mail.js";

export const getMessages = async(req, res) => {
    try {
        const messages = await Message.find()
        handleResponseSuccess(res, 200, "Get foods successfully", { messages })
    } catch (error) {
        handleResponseError(res, 500, "Internal server error")
        return
    }
}

export const createMessage = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        handleResponseError(res, 400, "All fields are required")
        return
    }
    const newMessage = await Message.create({ name, email, message });
    handleResponseSuccess(res, 201, "Send message successfully", {...newMessage._doc})

    await sendMail({
        name,
        email,
        subject: "Phan hoi cua khach hang",
        html: `
            <h3>Name: ${name}</h3>
            <h3>Email: ${email}</h3>
            <p>Message: ${message}</p>
        `
    })
}