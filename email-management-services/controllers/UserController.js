'use strict'
const util = require('../util/util.js');
const user_service = require('../services/userservice.js');
const group_service = require('../services/usergroup_service.js');
const role_service = require('../services/role_service.js');

const getUsers = ((req, res) => {
    user_service.getUsers(req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const getUser = ((req, res) => {
    const id = Number(req.params.id);
    user_service.getUser(id, req.tenant_name)
    .then(result => {
        if(result != null) {
            fill_user_object(result, req.tenant_name).
            then(user_obj => {
                res.status(200).json(user_obj);
            }).catch(error => {
                res.status(500).json({ error: error.message });
            });
        }else {
            res.status(500).json({ error: 'user doesnt exist' });
        }
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const createUser = ((req, res) => {
    var user = {};
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.userName = req.body.userName;
    user.password = req.body.password;
    user.email = req.body.email;
    user_service.get_user_by_email(user.email, req.tenant_name)
    .then(result => {
        if(result) {
            res.status(500).json({ message: 'user already exists' });
        }else {
            user_service.createUser(user, req.tenant_name)
            .then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json({ error: error.message });
            });
        }
    }).catch(error => {
        res.status(500).json({ message: error });
    });
});

const loginUser = ((req, res) => {
    const {email, password} = req.body;
    user_service.loginUser(email, password, req.tenant_name)
    .then(result => {
        fill_user_object(result, req.tenant_name).
        then(user_obj => {
            res.status(200).json(user_obj);
        }).catch(error => {
            res.status(500).json({ error: error.message });
        });
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const fill_user_object = (result, tenant_name) => {
    return new Promise((resolve, reject) => {
        const user_obj = {};
        const role_ids = [];
        if(result.group_ids != null) {
            get_groups_by_user(result.group_ids, tenant_name)
            .then(role_result => {
                role_ids.push(...role_result);
                if(result.role_ids) {
                    role_ids.push(...result.role_ids);
                }
                const uniqueRoles = [...new Set(role_ids)];
                get_permission_map(uniqueRoles, tenant_name).
                then(permissions_map => {
                    user_obj['firstName'] = result.firstName;
                    user_obj['lastName'] = result.lastName;
                    user_obj['userName'] = result.userName;
                    user_obj['email'] = result.email;
                    user_obj['group_ids'] = result.group_ids;
                    user_obj['role_ids'] = role_ids;
                    user_obj['permissions_map'] = permissions_map;
                    resolve(user_obj);
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        }else {
            resolve(result);
        }
    });
};

const get_permission_map = (role_ids, tenant_name) => {
    return new Promise((resolve, reject) => {
        role_service.get_roles_by_ids(role_ids, tenant_name)
        .then(role_result => {
            console.log("final result::::::::::::"+JSON.stringify(role_result, null, 2));
            const permissions_map = {};
            role_result.forEach(role_element => {
                console.log("final result::::::::::::"+role_element.name);
                if(role_element.resources) {
                    role_element.resources.forEach(element => {
                        var permission_labels;
                        if(permissions_map[element.name] != null) {
                            permission_labels = permissions_map[element.name];
                        }else {
                            permission_labels = [];
                        }
                        if(element.permissions) {
                            element.permissions.forEach(permission => {
                                permission_labels.push(permission.name);
                            });
                        }
                        const unique_permissions = [...new Set(permission_labels)];
                        permissions_map[element.name] = unique_permissions;
                    });
                    console.log("permissions === "+permissions_map);  
                }
            });
            resolve(permissions_map);
        }).catch(error => {
            reject(error);
        });
    });
};

const get_groups_by_user = (group_ids, tenant_name) => {
    console.log("groupIds ============ "+group_ids);
    const role_ids = [];
    return new Promise((resolve, reject) => {
        group_service.get_user_groups_by_ids(group_ids, tenant_name)
        .then(result => {
            console.log("group_result === "+result);
            if(result != null) {
                result.forEach(element => {
                    if(element.role_ids) {
                        role_ids.push(...element.role_ids);
                    }
                });
                console.log("role_ids ====== "+role_ids);
                resolve(role_ids);
            }
        }).catch(error => {
            console.log('enable to fetch the groups');
        });
    });   
};

const updateUser = ((req, res) => {
    var user = {};
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.userName = req.body.userName;
    user.password = req.body.password;
    user.email = req.body.email;
    const id = req.params.id;
    user_service.updateUser(id, user, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
})

const deleteUser = ((req, res) => {
    const id = req.params.id;
    user_service.deleteUser(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}