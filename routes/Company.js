import Company from '../controllers/Company';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
import uploader from '../utils/uploader';
import upload from '../utils/uploader';
const router = express.Router();

router.post('/',  passport.authenticate("jwt", { session : false }), uploader.single('logo'), Company.create);
router.put('/:companyId',  passport.authenticate("jwt", { session : false }), Company.update);
router.get('/', Company.getCompanies);

module.exports = router;