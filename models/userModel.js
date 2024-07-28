import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'user'
    }
});

const User = mongoose.model('users', userSchema);
export default User;