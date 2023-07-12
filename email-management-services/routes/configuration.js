const express = require('express')
const router = express.Router()
const validate_tenant = require('../intercepter/validate_tenant.js');
const validateUser = require('../intercepter/validateUser.js');

const  { 
    get_configuration,
    get_configurations,
    create_configuration,
    update_configuration,
    delete_configuration
} = require('../controllers/configuration_controller.js')


router.get('/', validate_tenant, get_configurations)

router.get('/:id', validate_tenant, get_configuration)

router.post('/', validate_tenant, create_configuration)

router.put('/:id', validate_tenant, update_configuration)

router.delete('/:id', validate_tenant, delete_configuration)

module.exports = router