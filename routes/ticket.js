var express = require('express');
var router = express.Router();
const {getTicketList, createTicket, buyTickets} = require ('../controllers/ticketController')
const {loginRequired} = require ('../middleware/auth')


router.route('/')
    .post(createTicket)
    .get(getTicketList)


router.route('/buy/:eid')
    .post(loginRequired, buyTickets)


module.exports = router;