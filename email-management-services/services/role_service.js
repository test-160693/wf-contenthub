const util = require('../util/util.js');

function get_roles(tenant_name) {
    const collection = util.get_roles_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, roles) => {
            if (err) {
                reject('Failed to retrieve roles');
            } else {
                resolve(roles);
            }
        });
    });
    
};

function get_role_by_name(name, tenant_name) {
    const collection = util.get_roles_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ name: name }, (err, user) => {
            if (err) {
                reject('Failed to find role');
            } else {
                resolve(user);
            }
        });
    });
};

function get_roles_by_ids(ids, tenant_name) {
    const collection = util.get_roles_collection(tenant_name);
    const query = { _id: { $in: ids } };
    return new Promise((resolve, reject) => {
        collection.find(query).toArray((err, roles) => {
            if (err) {
                reject('Failed to retrieve roles');
            } else {
                resolve(roles);
            }
        });
    });   
};
  
function get_role(id, tenant_name) {
    const collection = util.get_roles_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: id }, (err, role) => {
            if (err) {
                reject('Failed to retrieve role');
            } else {
                if(role != null) {
                    resolve(role);
                }else {
                    reject('role not exist for id : '+id);
                }
            }
        });
    });
    
};
  
function create_role(role, tenant_name) {
    const collection = util.get_roles_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.insert(role, (err, result) => {
            if (err) {
                reject('Failed to create role');
            } else {
                resolve(result);
            }
        });
    });
};
  
function update_role(id, role, tenant_name) {
    const collection = util.get_roles_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.update(
            { _id: id },
            { $set: role },
            { multi: false },
            (err, result) => {
                if (err) {
                    reject('Failed to update role');
                } else if (result.nModified === 0) {
                    reject('role not found');
                } else {
                    resolve(result);
                }
            }
        );
    });
};
  
function delete_role(id, tenant_name) {
    const collection = util.get_roles_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.remove(
            { _id: id },
            { justOne: true },
            (err, result) => {
                if (err) {
                    reject('Failed to delete role');
                } else if (result.n === 0) {
                    reject('role not found');
                } else {
                    resolve({ message: 'role deleted successfully' });
                }
            }
        );
    }); 
};
  
module.exports = {
    get_roles,
    get_role,
    create_role,
    update_role,
    delete_role,
    get_role_by_name,
    get_roles_by_ids
}