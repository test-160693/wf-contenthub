const express = require('express')
const router = express.Router()
const validate_tenant = require('../intercepter/validate_tenant.js');
const validateUser = require('../intercepter/validateUser.js');

const  { 
    get_resources,
    get_resource,
    create_resource,
    update_resource,
    delete_resource
} = require('../controllers/resources_controller.js')

/**
 * @route GET /users/
 * @returns {User} List of all user objects
 */
router.get('/', validate_tenant, get_resources)

router.get('/:id', validate_tenant, get_resource)

router.post('/', validate_tenant, create_resource)

router.put('/:id', validate_tenant, update_resource)

router.delete('/:id', validate_tenant, delete_resource)

module.exports = router