const express = require('express')
const router = express.Router()
const validate_tenant = require('../intercepter/validate_tenant.js');
const validateUser = require('../intercepter/validateUser.js');

const  { 
    get_roles,
    get_role,
    create_role,
    update_role,
    delete_role,
    assign_permissions,
    assign_users
} = require('../controllers/roles_controller.js')

/**
 * @route GET /users/
 * @returns {User} List of all user objects
 */
router.get('/', validate_tenant, get_roles)

router.get('/:id', validate_tenant, get_role)

router.post('/', validate_tenant, create_role)

router.put('/:id', validate_tenant, update_role)

router.delete('/:id', validate_tenant, delete_role)

router.put('/:id/permissions', validate_tenant, assign_permissions)

router.put('/:id/users', validate_tenant, assign_users)

module.exports = router