'use strict'
const util = require('../util/util.js');
const tenant_service = require('../services/tenantservice.js');
const start = require('../config/startup.js');
const collection_name = 'tenants';
const tenant_name = 'Administrator';

const get_tenants = (async(req, res) => {
    const collection = util.get_collection(tenant_name, collection_name);
    tenant_service.get_tenants(collection)
    .then(result => res.status(200).json(result))
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ error: err.message });
    });
});


const create_tenant = ((req, res) => {
    var tenant = {};
    tenant.tenant_name = req.body.tenant_name;
    tenant.description = req.body.description;
    const collection = util.get_collection(tenant_name, collection_name);
    tenant_service.get_tenant_by_name(tenant.tenant_name, collection)
    .then(result => {
        if(result) {
            res.status(500).json({ message: 'tenant already exists' });
        }else {
            start.create_tenant_user(tenant.tenant_name, tenant.description).
            then(result => {
                const output = {};
                output.message = 'Tenant successfully created also Administrator account also created. Please find details in the response';
                output.user = result;
                res.status(200).json(output);
            }).catch(error => res.status(500).json({ message: error }));
        }
    }).catch(error => {
        res.status(500).json({ message: error });
    }); 
});

const get_tenant = ((req, res) => {
    const id = req.params.id;
    try {
        res.status(201).json(tenant_service.get_tenant(id, util.get_collection(tenant_name, collection_name)));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const delete_tenant = ((req, res) => {
    const id = req.params.id;
    try {
        res.status(201).json(tenant_service.delete_tenant(id, util.get_collection(tenant_name, collection_name)));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = {
    get_tenants,
    create_tenant,
    get_tenant,
    delete_tenant
}