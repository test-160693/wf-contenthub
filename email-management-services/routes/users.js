const express = require('express')
const router = express.Router()
const validate_tenant = require('../intercepter/validate_tenant.js');
const validateUser = require('../intercepter/validateUser.js');

const  { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
} = require('../controllers/UserController.js')

/**
 * @route GET /users/
 * @returns {User} List of all user objects
 */
router.get('/', validate_tenant, getUsers)

router.get('/:id', validate_tenant, getUser)

router.post('/', validate_tenant, createUser)

router.put('/:id', validate_tenant, updateUser)

router.delete('/:id', validate_tenant, deleteUser)

router.post('/login', validate_tenant, loginUser)

module.exports = router