const express = require('express');
const router = express.Router();
const RoleController = require('./roles.controller');

router.get('/', RoleController.getAll);
router.get('/:id', RoleController.getOne);
router.post('/', RoleController.create);
router.put('/:id', RoleController.update);
router.delete('/:id', RoleController.remove);

module.exports = router;