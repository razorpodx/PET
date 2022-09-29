import express from 'express';
import controller from '@controllers/User';

const router = express.Router();

router.get('/', controller.test);

export default router;
