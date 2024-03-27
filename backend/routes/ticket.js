const express = require('express');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

const router = express.Router();

const ticketCtrl = require('../controllers/ticket');

router.get('/',auth, ticketCtrl.getAllTicket);
router.post('/',auth ,multer, ticketCtrl.createTicket);
router.get('/:id',auth , ticketCtrl.getOneTicket);
router.put('/:id',auth ,multer, ticketCtrl.modifyTicket);
router.delete('/:id',auth ,ticketCtrl.deleteTicket);

module.exports = router;