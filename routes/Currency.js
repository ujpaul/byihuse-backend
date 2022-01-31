import Currency from '../controllers/Currency';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
const router = express.Router();

router.post('/', passport.authenticate("jwt", { session : false }), Currency.create);
router.put('/:currencyId', passport.authenticate("jwt", { session : false }), Currency.update);
router.get('/', Currency.getCurrencies);

module.exports = router;