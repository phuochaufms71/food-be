import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    
});

const Message = mongoose.model('message', messageSchema);
export default Message;