const express = require('express');
const userController = require('../controllers/userController');
const { validate } = require('../middlewares/validator');
const { userSchema } = require('../api-data-schema/addUserSchema');
const {updateUserSchema}=require('../api-data-schema/updateUserSchema');
const authMiddlware = require('../middlewares/authMiddlware');
const router = express.Router();

router.get('/',authMiddlware, userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/',validate(userSchema), userController.createUser);
router.put('/',validate(updateUserSchema),userController.updateUser);
router.delete('/',userController.deleteUser);
module.exports = router;
