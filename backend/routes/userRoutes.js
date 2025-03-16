const express = require('express');
const userController = require('../controllers/userController');
const { validate } = require('../middlewares/validator');
const { userSchema } = require('../api-data-schema/addUserSchema');
const {updateUserSchema}=require('../api-data-schema/updateUserSchema');
const authMiddlware = require('../middlewares/authMiddlware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const Role = require('../config/Role');
const router = express.Router();

router.get('/',authMiddlware,roleMiddleware([Role.Master,Role['Camp Admin']]), userController.getUsers);
router.get('/:id',authMiddlware,roleMiddleware([Role.Master,Role['Camp Admin']]), userController.getUserById);
router.post('/',authMiddlware,roleMiddleware([Role.Master,Role['Camp Admin']]),validate(userSchema), userController.createUser);
router.put('/',authMiddlware,roleMiddleware([Role.Master,Role['Camp Admin']]),validate(updateUserSchema),userController.updateUser);
router.delete('/',authMiddlware,roleMiddleware([Role.Master,Role['Camp Admin']]),userController.deleteUser);
module.exports = router;
