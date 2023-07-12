'use strict'
const util = require('../util/util.js');
const permission_service = require('../services/permission_service.js');

const get_permissions = ((req, res) => {
    permission_service.get_permissions(req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const get_permission = ((req, res) => {
    const id = Number(req.params.id);
    permission_service.get_permission(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const create_permission = ((req, res) => {
    var permission = {};
    permission.name = req.body.name;
    permission.description = req.body.description;
    permission.status = 'Active';
    permission_service.create_permission(permission, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const update_permission = ((req, res) => {
    var permission = {};
    permission.name = req.body.name;
    permission.description = req.body.description;
    permission.status = req.body.status;
    const id = req.params.id;
    permission_service.update_permission(id, permission, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
})

const delete_permission = ((req, res) => {
    const id = req.params.id;
    permission_service.delete_permission(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

module.exports = {
    get_permissions,
    get_permission,
    create_permission,
    update_permission,
    delete_permission
}