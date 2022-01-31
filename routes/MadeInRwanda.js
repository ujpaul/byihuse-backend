import Product from '../controllers/MadeInRwanda';
import express from 'express';
import '../middleware/auth';
const router = express.Router();
router.get('/', Product.getAllMadeInRwandaProducts);
module.exports = router;
