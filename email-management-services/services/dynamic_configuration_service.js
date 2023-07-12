const util = require('../util/util.js');

function get_dynamic_jsons(tenant_name) {
    const collection = util.get_dynamic_configuration_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, jsons) => {
            if (err) {
                reject('Failed to retrieve jsons');
            } else {
                resolve(jsons);
            }
        });
    }); 
};

function get_dynamic_json_by_ids(ids, tenant_name) {
    const collection = util.get_dynamic_configuration_collection(tenant_name);
    const query = { _id: { $in: ids } };
    return new Promise((resolve, reject) => {
        collection.find(query).toArray((err, jsons) => {
            if (err) {
                reject('Failed to retrieve jsons');
            } else {
                resolve(jsons);
            }
        });
    });
};
  
function get_dynamic_json(id, tenant_name) {
    const collection = util.get_dynamic_configuration_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: id }, (err, json) => {
            if (err) {
                reject('Failed to retrieve json');
            } else {
                resolve(json);
            }
        });
    });
    
};
  
function create_dynamic_jsons(json, tenant_name) {
    const collection = util.get_dynamic_configuration_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.insert(json, (err, result) => {
            if (err) {
                reject('Failed to create json');
            } else {
                resolve(result);
            }
        });
    });
};
  
function update_dynamic_jsons(id, json, tenant_name) {
    const collection = util.get_dynamic_configuration_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.update(
            { _id: id },
            { $set: json },
            { multi: false },
            (err, result) => {
                if (err) {
                    reject('Failed to update json');
                } else if (result.nModified === 0) {
                    reject('json not found');
                } else {
                    resolve(result);
                }
            }
        );
    });
};
  
function delete_dynamic_json(id, tenant_name) {
    const collection = util.get_dynamic_configuration_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.remove(
            { _id: id },
            { justOne: true },
            (err, json) => {
                if (err) {
                    reject('Failed to delete json');
                } else if (json.n === 0) {
                    reject('permission not found');
                } else {
                    resolve({ message: 'Dynamic json deleted successfully' });
                }
            }
        );
    }); 
};
  
module.exports = {
    get_dynamic_jsons,
    get_dynamic_json,
    create_dynamic_jsons,
    update_dynamic_jsons,
    delete_dynamic_json,
    get_dynamic_json_by_ids
}