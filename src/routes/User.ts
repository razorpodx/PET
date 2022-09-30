import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.get('/', controller.getUsers);
router.post('/', controller.createUser);

export default router;
