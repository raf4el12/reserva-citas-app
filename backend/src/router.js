const express = require('express');
const router = express.Router();

const rolesRoutes = require('./security/roles/roles-routes');


router.use('/roles', rolesRoutes);

module.exports = router;