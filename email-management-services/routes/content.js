const express = require('express')
const router = express.Router()
const validate_tenant = require('../intercepter/validate_tenant.js');
const validateUser = require('../intercepter/validateUser.js');

const  { 
    get_contents,
    get_content,
    create_content,
    update_content,
    delete_content
} = require('../controllers/content_controller.js')


router.get('/', validate_tenant, get_contents)

router.get('/:id', validate_tenant, get_content)

router.post('/', validate_tenant, create_content)

router.put('/:id', validate_tenant, update_content)

router.delete('/:id', validate_tenant, delete_content)

module.exports = router