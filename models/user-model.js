
const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
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
    cart: {
        type: Array,
        default: []
    },
    isadmin: {
        type: Boolean,
        default: false
    },
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type:Number,
        required: true
    },
        picturre: {
        type: String,
        required: true
        }
    });

module.exports = mongoose.model('user', userSchema);

  