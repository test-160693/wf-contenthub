function create_tenant(tenant, collection) {
    return new Promise((resolve, reject) => {
        collection.insert(tenant, (err, result) => {
            if (err) {
                reject('Failed to create tenant');
            } else {
                resolve(result);
            }
        });
    });
};

function get_tenant_by_name(tenant_name, collection) {
    return new Promise((resolve, reject) => {
        collection.findOne({ tenant_name: tenant_name }, (err, tenant) => {
            if (err) {
                reject('Failed to find tenant');
            } else {
                resolve(tenant);
            }
        });
    });
};

function get_tenant(id, collection) {
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: id }, (err, tenant) => {
            if (err) {
                reject('Failed to find tenant');
            } else {
                if(!tenant) {
                    reject("Tenant not found in the database");
                }else {
                    resolve(tenant);
                }
            }
        });
    });
};

function get_tenants(collection) {
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, tenants) => {
            if (err) {
                reject('Failed to retrieve tenants');
            } else {
                resolve(tenants);
            }
        });
    });
};

function delete_tenant(id, collection) {
    return new Promise((resolve, reject) => {
        collection.remove(
            { _id: id },
            { justOne: true },
            (err, result) => {
                if (err) {
                    reject('Error deleting tenant');
                } else {
                    resolve({ message: 'tenant deleted successfully' });
                }
            }
        );
    });
};

module.exports = { create_tenant, get_tenants, delete_tenant, get_tenant, get_tenant_by_name}