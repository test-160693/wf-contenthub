const util = require('../util/util.js');

function get_user_groups(tenant_name) {
    const collection = util.get_user_group_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, user_groups) => {
            if (err) {
                reject('Failed to retrieve user_groups');
            } else {
                resolve(user_groups);
            }
        });
    });
    
};
  
function get_user_group(id, tenant_name) {
    const collection = util.get_user_group_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: id }, (err, user_group) => {
            if (err) {
                reject('Failed to retrieve user group');
            } else {
                resolve(user_group);
            }
        });
    }); 
};

function get_user_groups_by_ids(ids, tenant_name) {
    const collection = util.get_user_group_collection(tenant_name);
    const query = { _id: { $in: ids } };
    return new Promise((resolve, reject) => {
        collection.find(query).toArray((err, user_groups) => {
            if (err) {
                reject('Failed to retrieve roles');
            } else {
                resolve(user_groups);
            }
        });
    }); 
}
  
function create_user_group(user_group, tenant_name) {
    const collection = util.get_user_group_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.insert(user_group, (err, result) => {
            if (err) {
                reject('Failed to create user group');
            } else {
                resolve(result);
            }
        });
    });
};
  
function update_user_group(id, user_group, tenant_name) {
    const collection = util.get_user_group_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.update(
            { _id: id },
            { $set: user_group },
            { multi: false },
            (err, result) => {
                if (err) {
                    reject('Failed to update user group');
                } else if (result.nModified === 0) {
                    reject('user group not found');
                } else {
                    resolve(result);
                }
            }
        );
    });
};
  
function delete_user_group(id, tenant_name) {
    const collection = util.get_user_group_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.remove(
            { _id: id },
            { justOne: true },
            (err, result) => {
                if (err) {
                    reject('Failed to delete user group');
                } else if (result.n === 0) {
                    reject('user group not found');
                } else {
                    resolve({ message: 'user group deleted successfully' });
                }
            }
        );
    }); 
};
  
module.exports = {
    get_user_groups,
    get_user_group,
    create_user_group,
    update_user_group,
    delete_user_group,
    get_user_groups_by_ids
}