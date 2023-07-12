const util = require('../util/util.js');

function get_rules(tenant_name) {
    const collection = util.get_rules_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, rules) => {
            if (err) {
                reject('Failed to retrieve rules');
            } else {
                resolve(rules);
            }
        });
    });
    
};

function get_rule_by_name(name, tenant_name) {
    const collection = util.get_rules_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ name: name }, (err, rule) => {
            if (err) {
                reject('Failed to find role');
            } else {
                resolve(rule);
            }
        });
    });
};

function get_rules_by_ids(ids, tenant_name) {
    const collection = util.get_rules_collection(tenant_name);
    const query = { _id: { $in: ids } };
    return new Promise((resolve, reject) => {
        collection.find(query).toArray((err, rules) => {
            if (err) {
                reject('Failed to retrieve rules');
            } else {
                resolve(rules);
            }
        });
    });   
};
  
function get_rule(id, tenant_name) {
    const collection = util.get_rules_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: id }, (err, rule) => {
            if (err) {
                reject('Failed to retrieve rule');
            } else {
                resolve(rule);
            }
        });
    });
    
};
  
function create_rule(rule, tenant_name) {
    const collection = util.get_rules_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.insert(rule, (err, rule) => {
            if (err) {
                reject('Failed to create rule');
            } else {
                resolve(rule);
            }
        });
    });
};
  
function update_rule(id, rule, tenant_name) {
    const collection = util.get_rules_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.update(
            { _id: id },
            { $set: rule },
            { multi: false },
            (err, result) => {
                if (err) {
                    reject('Failed to update rule');
                } else if (result.nModified === 0) {
                    reject('rule not found');
                } else {
                    resolve(result);
                }
            }
        );
    });
};
  
function delete_rule(id, tenant_name) {
    const collection = util.get_rules_collection(tenant_name);
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
    get_rule,
    get_rules,
    create_rule,
    update_rule,
    delete_rule,
    get_rule_by_name,
    get_rules_by_ids
}