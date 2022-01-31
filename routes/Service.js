import Service from '../controllers/Service';
import express from 'express';
import passport from 'passport';
import '../middleware/auth';
import uploader from '../utils/uploader';
const router = express.Router();

router.post('/', passport.authenticate("jwt", { session : false }), uploader.fields([{name: 'picture1'},{name: 'picture2'}, {name: 'picture3'}, {name: 'picture4'}, ]), Service.create);
router.put('/:serviceId', passport.authenticate("jwt", { session : false }), Service.update);
router.get('/:serviceId', Service.getServiceDetails);
router.get('/', Service.getAll);

module.exports = router;