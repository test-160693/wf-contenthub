'use strict'
const configuration_service = require('../services/configuration_service.js');

const get_configurations = ((req, res) => {
    configuration_service.get_configurations(req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const get_configuration = ((req, res) => {
    const id = Number(req.params.id);
    configuration_service.get_configuration(id, req.tenant_name)
    .then(result => {
        if(result != null) {
            res.status(200).json(result);
        }else {
            res.status(500).json({ error: 'configuration doesnt exist' });
        }
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const create_configuration = ((req, res) => {
    var configuration = {};
    const dynamic_configuration = req.body.configuration;
    dynamic_configuration.forEach((value, key) => {
        configuration[key] = value;
    });
    configuration_service.create_configuration(user, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const update_configuration = ((req, res) => {
    const id = req.params.id;
    var configuration = {};
    const dynamic_configuration = req.body.configuration;
    dynamic_configuration.forEach((value, key) => {
        configuration[key] = value;
    });
    configuration_service.update_configuration(id, configuration, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
})

const delete_configuration = ((req, res) => {
    const id = req.params.id;
    configuration_service.delete_configuration(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

module.exports = {
    get_configuration,
    get_configurations,
    create_configuration,
    update_configuration,
    delete_configuration
}