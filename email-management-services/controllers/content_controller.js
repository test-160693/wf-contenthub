'use strict'
const content_service = require('../services/content_service.js');
const configuration_service = require('../services/configuration_service.js');

const get_contents = ((req, res) => {
    content_service.get_contents(req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const get_content = ((req, res) => {
    const id = Number(req.params.id);
    content_service.get_content(id, req.tenant_name)
    .then(result => {
        if(result != null) {
            res.status(200).json(result);
        }else {
            res.status(500).json({ error: 'content doesnt exist' });
        }
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const create_content = ((req, res) => {
    const configurations = configuration_service.get_configurations();
    if(configurations && configurations.length > 0) {
        const configurtaion = configurations[0];
        const content = {};
        configurtaion.forEach((value, key) => {
            if(req.body[key] != null) {
                content[key] = req.body[key];
            }
        });
        content.content = req.body.content;
        content.status = req.body.status;
        content_service.create_content(content, req.tenant_name)
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json({ error: error.message });
        });
    }else {
        res.status(500).json({ error: 'configuration is not defined. Please add configuration first.' });
    }
});

const update_content = ((req, res) => {
    const id = req.params.id;
    const configurations = configuration_service.get_configurations();
    if(configurations && configurations.length > 0) {
        const configurtaion = configurations[0];
        const content = {};
        configurtaion.forEach((value, key) => {
            if(req.body[key] != null) {
                content[key] = req.body[key];
            }
        });
        content.content = req.body.content;
        content.status = req.body.status;
        content_service.update_content(id, content, req.tenant_name)
        .then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json({ error: error.message });
        });
    }else {
        res.status(500).json({ error: 'configuration is not defined. Please add configuration first.' });
    }
})

const delete_content = ((req, res) => {
    const id = req.params.id;
    content_service.delete_content(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

module.exports = {
    get_contents,
    get_content,
    create_content,
    update_content,
    delete_content
}