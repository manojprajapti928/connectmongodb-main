import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 99
    }
});

const User = mongoose.model("User", userSchema);
export default User;
