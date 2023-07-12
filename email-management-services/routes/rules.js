const express = require('express')
const router = express.Router()
const validate_tenant = require('../intercepter/validate_tenant.js');
const validateUser = require('../intercepter/validateUser.js');

const  { 
    get_rule,
    get_rules,
    create_rule,
    update_rule,
    delete_rule
} = require('../controllers/rules_controller.js')


router.get('/', validate_tenant, get_rules)

router.get('/:id', validate_tenant, get_rule)

router.post('/', validate_tenant, create_rule)

router.put('/:id', validate_tenant, update_rule)

router.delete('/:id', validate_tenant, delete_rule)

module.exports = router