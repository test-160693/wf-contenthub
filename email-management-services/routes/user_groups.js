const express = require('express')
const router = express.Router()
const validate_tenant = require('../intercepter/validate_tenant.js');
const validateUser = require('../intercepter/validateUser.js');

const  { 
    get_user_groups,
    get_user_group,
    create_user_group,
    update_user_group,
    delete_user_group,
    assign_roles,
    assign_users
} = require('../controllers/user_groups_controller.js')

router.get('/', validate_tenant, get_user_groups)

router.get('/:id', validate_tenant, get_user_group)

router.post('/', validate_tenant, create_user_group)

router.put('/:id', validate_tenant, update_user_group)

router.delete('/:id', validate_tenant, delete_user_group)

router.put('/:id/roles', validate_tenant, assign_roles)

router.put('/:id/users', validate_tenant, assign_users)

module.exports = router