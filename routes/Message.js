import Message from '../controllers/Message';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
const router = express.Router();

router.post('/', Message.create);
router.get('/',  passport.authenticate("jwt", { session : false }), Message.getMessages);

module.exports = router;