const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mywebapp')
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});
module.exports = mongoose.connection; 