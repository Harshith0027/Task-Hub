import mongoose,{Schema} from 'mongoose';

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
const User = mongoose.model('User_Model', UsersSchema);
User.createIndexes();
export default User;