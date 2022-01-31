import Refunded from '../controllers/Refunded';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
const router = express.Router();
router.get('/', passport.authenticate('jwt', { session: false }), Refunded.getAllRefunded);

module.exports = router;
