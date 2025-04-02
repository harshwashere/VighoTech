import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rentedbook: {
        type: String,
        ref: "Books",
        default: ""
    }
}, { timestamps: true })

userModel.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userModel.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userid: this._id.toString(),
                email: this.email,
            },
            process.env.KEY,
            {
                expiresIn: "1h",
            }
        );
    } catch (error) {
        console.error(error);
    }
};

const User = model("User", userModel)

export default User;