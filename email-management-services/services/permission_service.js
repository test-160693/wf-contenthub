const util = require('../util/util.js');

function get_permissions(tenant_name) {
    const collection = util.get_permissions_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, permissions) => {
            if (err) {
                reject('Failed to retrieve permissions');
            } else {
                resolve(permissions);
            }
        });
    });
    
};

function get_permission_by_ids(ids, tenant_name) {
    const collection = util.get_permissions_collection(tenant_name);
    const query = { _id: { $in: ids } };
    return new Promise((resolve, reject) => {
        collection.find(query).toArray((err, permissions) => {
            if (err) {
                reject('Failed to retrieve permissions');
            } else {
                resolve(permissions);
            }
        });
    });
};
  
function get_permission(id, tenant_name) {
    const collection = util.get_permissions_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: id }, (err, permission) => {
            if (err) {
                reject('Failed to retrieve permission');
            } else {
                resolve(permission);
            }
        });
    });
    
};
  
function create_permission(permission, tenant_name) {
    const collection = util.get_permissions_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.insert(permission, (err, result) => {
            if (err) {
                reject('Failed to create permission');
            } else {
                resolve(result);
            }
        });
    });
};

function create_bulk_permissions(permissions, tenant_name) {
    const collection = util.get_permissions_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.insert(permissions, (err, results) => {
            if (err) {
                reject('Failed to create permissions');
            } else {
                resolve(results);
            }
        });
    });
};
  
function update_permission(id, permission, tenant_name) {
    const collection = util.get_permissions_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.update(
            { _id: id },
            { $set: permission },
            { multi: false },
            (err, result) => {
                if (err) {
                    reject('Failed to update permission');
                } else if (result.nModified === 0) {
                    reject('permission not found');
                } else {
                    resolve(result);
                }
            }
        );
    });
};
  
function delete_permission(id, tenant_name) {
    const collection = util.get_permissions_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.remove(
            { _id: id },
            { justOne: true },
            (err, result) => {
                if (err) {
                    reject('Failed to delete permission');
                } else if (result.n === 0) {
                    reject('permission not found');
                } else {
                    resolve({ message: 'permission deleted successfully' });
                }
            }
        );
    }); 
};
  
module.exports = {
    get_permissions,
    get_permission,
    create_permission,
    update_permission,
    delete_permission,
    get_permission_by_ids,
    create_bulk_permissions
}