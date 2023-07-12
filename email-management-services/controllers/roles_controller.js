'use strict'
const util = require('../util/util.js');
const role_service = require('../services/role_service.js');
const resource_service = require('../services/resource_service.js');
const permission_service = require('../services/permission_service.js');
const user_service = require('../services/userservice.js');

const get_roles = ((req, res) => {
    role_service.get_roles(req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error });
    });
});

const get_role = ((req, res) => {
    const id = Number(req.params.id);
    role_service.get_role(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error });
    });
});

const create_role = ((req, res) => {
    var role = {};
    role.name = req.body.name;
    role.description = req.body.description;
    role.status = 'Active';
    role_service.get_role_by_name(role.name, req.tenant_name)
    .then(result => {
        if(result) {
            res.status(500).json({ message: 'role already exists' });
        }else {
            role_service.create_role(role, req.tenant_name)
            .then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json({ error: error });
            });
        }
    }).catch(error => {
        res.status(500).json({ message: error });
    });
    
});

const update_role = ((req, res) => {
    var role = {};
    role.name = req.body.name;
    role.description = req.body.description;
    role.status = req.body.status;
    const id = req.params.id;
    role_service.update_role(id, role, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error });
    });
})

const delete_role = ((req, res) => {
    const id = req.params.id;
    role_service.delete_role(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error });
    });
});

const assign_permissions = ((req, res) => {
    const role_id = req.params.id;
    role_service.get_role(role_id, req.tenant_name)
    .then(result => {
        console.log("result ==== "+JSON.stringify(result));
        const resources = req.body.resources;
        console.log("resources ==== "+JSON.stringify(resources));
        const resource_ids = [];
        const permission_id = [];
        resources.forEach((resource) => {
            resource_ids.push(resource.id);
            const permissions = resource.permissions;
            permissions.forEach((permission) => {
                permission_id.push(permission.id);
            });
        });
        console.log("resource ids ==== "+resource_ids);
        console.log("permission_id ids ==== "+permission_id);
        const unique_permission_ids = [...new Set(permission_id)];
        resource_service.get_resources_by_ids(resource_ids, req.tenant_name)
        .then(resource_result => {
            console.log(resource_result);
            if(resource_result.length === resource_ids.length) {
                permission_service.get_permission_by_ids(unique_permission_ids, req.tenant_name)
                .then(permission_result => {
                    if(permission_result.length === unique_permission_ids.length) {
                        console.log(permission_result);

                        console.log(result);

                        console.log(resources);

                        result.resources = resources;
                        
                        role_service.update_role(role_id, result, req.tenant_name)
                        .then(role_result => {
                            res.status(200).json({message: 'Role updated successfully'});
                        }).catch(error => {res.status(500).json({ error: error }); });
                    }else {
                        res.status(500).json({ error: 'permission ids are not matching with DB' });
                    }
                }).catch(error => { res.status(500).json({ error: error }); })
            }else {
                res.status(500).json({ error: 'resource ids are not matching with DB' });
            }
        }).catch(error => { res.status(500).json({ error: error }); });
    }).catch(error => {
        res.status(500).json({ error: error });
    });
});

const assign_users = ((req, res) => {
    const role_id = req.params.id;
    role_service.get_role(role_id, req.tenant_name)
    .then(result => {
        const user_ids = req.body.user_ids;
        user_service.get_users_by_ids(user_ids, req.tenant_name)
        .then(user_result => {
            if(user_result.length === user_ids.length) {
                result.user_ids = user_ids;
                role_service.update_role(role_id, result, req.tenant_name)
                .then(role_user_result => {
                    assign_roles_users(role_id, user_result, req.tenant_name);
                    res.status(200).json(result);
                }).catch(error => res.status(500).json({ error: error }));
            }
        }).catch(error => res.status(500).json({ error: error }));
    }).catch(error => {
        res.status(500).json({ error: error });
    });
});

const assign_roles_users = (role_id, user_result, tenant_name) => {
    user_result.forEach(element => {
        if(element.role_ids) {
            element.role_ids.push(role_id);
        }else {
            const role_array = [];
            role_array.push(role_id);
            element.role_ids = role_array;
        }
        user_service.updateUser(element._id, element, tenant_name);
    });
};

module.exports = {
    get_roles,
    get_role,
    create_role,
    update_role,
    delete_role,
    assign_permissions,
    assign_users
}