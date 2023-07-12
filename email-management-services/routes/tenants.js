const express = require('express')
const router = express.Router()

const  { 
    get_tenants,
    get_tenant,
    create_tenant,
    delete_tenant
} = require('../controllers/tenant_controller.js')

router.get('/', get_tenants)

router.get('/:id', get_tenant)

router.post('/', create_tenant)

router.delete('/:id', delete_tenant)

module.exports = router