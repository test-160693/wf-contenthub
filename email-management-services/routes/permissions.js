const express = require('express')
const router = express.Router()
const validate_tenant = require('../intercepter/validate_tenant.js');
const validateUser = require('../intercepter/validateUser.js');

const  { 
    get_permissions,
    get_permission,
    create_permission,
    update_permission,
    delete_permission
} = require('../controllers/permissions_controller.js')

/**
 * @route GET /users/
 * @returns {User} List of all user objects
 */
router.get('/', validate_tenant, get_permissions)

router.get('/:id', validate_tenant, get_permission)

router.post('/', validate_tenant, create_permission)

router.put('/:id', validate_tenant, update_permission)

router.delete('/:id', validate_tenant, delete_permission)

module.exports = router