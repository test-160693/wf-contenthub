'use strict'
const util = require('../util/util.js');
const user_group_service = require('../services/usergroup_service.js');
const role_service = require('../services/role_service.js');
const user_service = require('../services/userservice.js');

const get_user_groups = ((req, res) => {
    user_group_service.get_user_groups(req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const get_user_group = ((req, res) => {
    const id = Number(req.params.id);
    user_group_service.get_user_group(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const create_user_group = ((req, res) => {
    var user_group = {};
    user_group.name = req.body.name;
    user_group.description = req.body.description;
    user_group.status = 'Active';
    user_group_service.create_user_group(user_group, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const update_user_group = ((req, res) => {
    var user_group = {};
    user_group.name = req.body.name;
    user_group.description = req.body.description;
    user_group.status = req.body.status;
    const id = req.params.id;
    user_group_service.update_user_group(id, user_group, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
})

const delete_user_group = ((req, res) => {
    const id = req.params.id;
    user_group_service.delete_user_group(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const assign_roles = ((req, res) => {
    const group_id = req.params.id;
    console.log("group_id === "+group_id);
    user_group_service.get_user_group(group_id, req.tenant_name)
    .then(result => {
        const role_ids = req.body.role_ids;
        console.log("role ids :"+role_ids);
        role_service.get_roles_by_ids(role_ids, req.tenant_name)
        .then(role_result => {
            if(role_result.length === role_ids.length) {
                result.role_ids = role_ids;
                user_group_service.update_user_group(group_id, result, req.tenant_name)
                .then(user_group_result => {
                    res.status(200).json(result);
                }).catch(error => res.status(500).json({ error: error.message }));
            }else {
                res.status(500).json({ error: 'Roles doesnt exist' });
            }
        }).catch(error => res.status(500).json({ error: error.message }));
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const assign_users = ((req, res) => {
    const group_id = req.params.id;
    user_group_service.get_user_group(group_id, req.tenant_name)
    .then(result => {
        const user_ids = req.body.user_ids;
        console.log("user_ids === "+user_ids.length);
        user_service.get_users_by_ids(user_ids, req.tenant_name)
        .then(user_result => {
            console.log("user_result === "+user_result);
            if(user_result && (user_result.length === user_ids.length)) {
                result.user_ids = user_ids;
                console.log("user_result === "+user_ids);
                user_group_service.update_user_group(group_id, result, req.tenant_name)
                .then(user_group_result => {
                    assign_groups_users(group_id, user_result, req.tenant_name);
                    res.status(200).json(result);
                }).catch(error => res.status(500).json({ error: error.message }));
            }else {
                res.status(500).json({ error: 'user not found in DB' })
            }
        }).catch(error => res.status(500).json({ error: error.message }));
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const assign_groups_users = (group_id, user_result, tenant_name) => {
    console.log("user_result re === "+user_result.length);
    user_result.forEach(element => {
        console.log("element.group_ids === "+element.group_ids);
        const groupArray = [];
        if(element.group_ids != null) {
            element.group_ids.forEach(ele => {
                if(ele != null) {
                    groupArray.push(ele);
                }
            })
        }
        groupArray.push(group_id);
        const uniqueArray = [...new Set(groupArray)];
        console.log("uniqueArray === "+uniqueArray);
        element.group_ids = uniqueArray;
        console.log("element.group_ids === "+element.group_ids);
        console.log("element._id === "+element._id);
        user_service.updateUser(element._id, element, tenant_name);
    });
};

module.exports = {
    get_user_groups,
    get_user_group,
    create_user_group,
    update_user_group,
    delete_user_group,
    assign_roles,
    assign_users
}