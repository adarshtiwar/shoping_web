const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
   res.send('hey this is product');
});
module.exports = router;