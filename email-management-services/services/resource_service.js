const util = require('../util/util.js');

function get_resources(tenant_name) {
    const collection = util.get_resources_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, resources) => {
            if (err) {
                reject('Failed to retrieve resources');
            } else {
                resolve(resources);
            }
        });
    });
    
};

function get_resources_by_ids(ids, tenant_name) {
    const collection = util.get_resources_collection(tenant_name);
    console.log("collection === "+collection);
    const query = { _id: { $in: ids } };
    return new Promise((resolve, reject) => {
        collection.find(query).toArray((err, resources) => {
            if (err) {
                reject('Failed to retrieve resources');
            } else {
                resolve(resources);
            }
        });
    });
    
};
  
function get_resource(id, tenant_name) {
    const collection = util.get_resources_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: id }, (err, resource) => {
            if (err) {
                reject('Failed to retrieve resource');
            } else {
                resolve(resource);
            }
        });
    });
    
};
  
function create_resource(resource, tenant_name) {
    const collection = util.get_resources_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.insert(resource, (err, result) => {
            if (err) {
                reject('Failed to create resource');
            } else {
                resolve(result);
            }
        });
    });
};

function create_bulk_resources(resources, tenant_name) {
    const collection = util.get_resources_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.insert(resources, (err, results) => {
            if (err) {
                reject('Failed to create resources');
            } else {
                resolve(results);
            }
        });
    });
}
  
function update_resource(id, resource, tenant_name) {
    const collection = util.get_resources_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.update(
            { _id: id },
            { $set: resource },
            { multi: false },
            (err, result) => {
                if (err) {
                    reject('Failed to update resource');
                } else if (result.nModified === 0) {
                    reject('resource not found');
                } else {
                    resolve(result);
                }
            }
        );
    });
};
  
function delete_resource(id, tenant_name) {
    const collection = util.get_resources_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.remove(
            { _id: id },
            { justOne: true },
            (err, result) => {
                if (err) {
                    reject('Failed to delete resource');
                } else if (result.n === 0) {
                    reject('resource not found');
                } else {
                    resolve({ message: 'resource deleted successfully' });
                }
            }
        );
    }); 
};
  
module.exports = {
    get_resources,
    get_resource,
    create_resource,
    update_resource,
    delete_resource,
    get_resources_by_ids,
    create_bulk_resources
}