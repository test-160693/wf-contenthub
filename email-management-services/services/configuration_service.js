const util = require('../util/util.js');

function get_configurations(tenant_name) {
    const collection = util.get_configuration_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, configuration) => {
            if (err) {
                reject('Failed to retrieve configuration');
            } else {
                resolve(configuration);
            }
        });
    });
};
  
function get_configuration(id, tenant_name) {
    const collection = util.get_configuration_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: id }, (err, configuration) => {
            if (err) {
                reject('Failed to retrieve configuration');
            } else {
                resolve(configuration);
            }
        });
    }); 
};
  
function create_configuration(configuration, tenant_name) {
    const collection = util.get_configuration_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.insert(role, (err, content) => {
            if (err) {
                reject('Failed to create content');
            } else {
                resolve(content);
            }
        });
    });
};
  
function update_configuration(id, configuration, tenant_name) {
    const collection = util.get_configuration_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.update(
            { _id: id },
            { $set: configuration },
            { multi: false },
            (err, result) => {
                if (err) {
                    reject('Failed to update configuration');
                } else if (result.nModified === 0) {
                    reject('configuration not found');
                } else {
                    resolve(result);
                }
            }
        );
    });
};
  
function delete_configuration(id, tenant_name) {
    const collection = util.get_configuration_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.remove(
            { _id: id },
            { justOne: true },
            (err, result) => {
                if (err) {
                    reject('Failed to delete configuration');
                } else if (result.n === 0) {
                    reject('configuration not found');
                } else {
                    resolve({ message: 'configuration deleted successfully' });
                }
            }
        );
    }); 
};
  
module.exports = {
    get_configurations,
    get_configuration,
    create_configuration,
    update_configuration,
    delete_configuration
}