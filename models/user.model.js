const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 5
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    }, {
        virtuals: {
            fullName: {
                get() {
                    return this.firstName + ' ' + this.lastName;
                }
            }
        }
    }, {
        timestamps: true
    })
);

module.exports = User;