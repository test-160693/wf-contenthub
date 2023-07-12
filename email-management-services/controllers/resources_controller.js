'use strict'
const util = require('../util/util.js');
const resource_service = require('../services/resource_service.js');

const get_resources = ((req, res) => {
    resource_service.get_resources(req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const get_resource = ((req, res) => {
    const id = Number(req.params.id);
    resource_service.get_resource(id, req.tenant_name)
    .then(result => {
        if(result) {
            res.status(200).json(result);
        }else {
            res.status(200).json({messge: 'No resource found for the id : {id}'});
        }
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const create_resource = ((req, res) => {
    var resource = {};
    resource.name = req.body.name;
    resource.description = req.body.description;
    resource.status = 'Active';
    resource_service.create_resource(resource, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const update_resource = ((req, res) => {
    var resource = {};
    resource.name = req.body.name;
    resource.description = req.body.description;
    resource.status = req.body.status;
    const id = req.params.id;
    resource_service.update_resource(id, resource, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
})

const delete_resource = ((req, res) => {
    const id = req.params.id;
    resource_service.delete_resource(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

module.exports = {
    get_resources,
    get_resource,
    create_resource,
    update_resource,
    delete_resource
}