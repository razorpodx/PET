import express from 'express';
import controller from '../controllers/User';

const router = express.Router();

router.get('/get', controller.readAll);
router.get('/get/:userid', controller.readUser);
router.post('/create', controller.createUser);
router.put('/update/:userid', controller.updateOrInsertUser);
router.patch('/update/:userid', controller.updateUser);
router.delete('/delete/:id', controller.deleteUser);

export default router;
