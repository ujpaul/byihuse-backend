import User from '../controllers/User';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
const router = express.Router();

router.post('/signup', User.signup);
router.post('/signin', User.signin);
router.get('/data', passport.authenticate('jwt', { session: false }), User.authenticate);
router.put('/name', passport.authenticate('jwt', { session: false }), User.updateName);
router.put('/pay-agent/:agentId', passport.authenticate('jwt', { session: false }), User.payAgent);
router.put('/email', passport.authenticate('jwt', { session: false }), User.updateEmail);
router.put('/password', passport.authenticate('jwt', { session: false }), User.updatePassword);
router.put('/departments', passport.authenticate('jwt', { session: false }), User.updateAssignedDepartments);
router.get('/users/:role', passport.authenticate('jwt', { session: false }), User.getAllUsers);

module.exports = router;
