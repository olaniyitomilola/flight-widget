const express =  require('express');
const router = express.Router();
const {getAllArrivals,getSingleArrival,getAllDepartures,getSingleDeparture} = require('../controller/controller')

router.route('/').get(getAllArrivals);
router.route('/search?').get(getSingleArrival)
router.route('/departure/').get(getAllDepartures);
router.route('/departure/search?').get(getSingleDeparture)
module.exports = router;