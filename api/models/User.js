import mongoose from "mongoose";
import bcyrptjs from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true,
        enum: ['Male', 'Female'],
    },
    genderPreference:{
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Both']
    },
    bio:{
        type: String,
        default:''
    },
    image:{type:String, default:''},
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    matches:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

});
userSchema.pre('save', async function (next) {
    // hash the password before saving the user model
    this.password = await bcyrptjs.hash(this.password, 10);
    next();
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcyrptjs.compare(enteredPassword, this.password);
}
const User = mongoose.model('User', userSchema);
export default User;