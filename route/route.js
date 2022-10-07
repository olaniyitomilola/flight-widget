const express =  require('express');
const router = express.Router();
const {getAllTravels,getSingleFlight} = require('../controller/controller')

router.route('/').get(getAllTravels);
router.route('/search?').get(getSingleFlight);


module.exports = router;