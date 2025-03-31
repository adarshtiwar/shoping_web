
const mongoose = require('mongoose');


const ownerSchema =  mongoose.Schema({
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
   
    products: {
        type: Array,
        default: []
    },
   
        picturre: {
        type: String,
        required: true
        },
        gstin:String,
    });

module.exports = mongoose.model('owner', ownerSchema);

  