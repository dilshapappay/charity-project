const express = require('express');
const roleController = require('../controllers/roleController');
const { validate } = require('../middlewares/validator');
const { roleSchema } = require('../api-data-schema/addRoleSchema');
const router = express.Router();

router.get('/', roleController.getRoles);
router.get('/:id', roleController.getRoleById);

router.post('/', validate(roleSchema),roleController.createRoles);
router.delete('/:id', roleController.deleteRoles);
module.exports = router;