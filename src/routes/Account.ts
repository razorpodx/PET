import express from 'express';
import controller from '../controllers/Account';

const router = express.Router();

router.get('/get', controller.readAll);
router.get('/get/:accountid', controller.readAccount);
router.post('/create', controller.createAccount);
router.patch('/update/:accountid', controller.updateAccount);
router.delete('/delete/:id', controller.deleteAccount);

export default router;
