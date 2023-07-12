const util = require('../util/util.js');

function get_contents(tenant_name) {
    const collection = util.get_content_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, contents) => {
            if (err) {
                reject('Failed to retrieve contents');
            } else {
                resolve(contents);
            }
        });
    });
};

function get_content_by_ids(ids, tenant_name) {
    const collection = util.get_content_collection(tenant_name);
    const query = { _id: { $in: ids } };
    return new Promise((resolve, reject) => {
        collection.find(query).toArray((err, contents) => {
            if (err) {
                reject('Failed to retrieve contents');
            } else {
                resolve(contents);
            }
        });
    });   
};
  
function get_content(id, tenant_name) {
    const collection = util.get_content_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: id }, (err, content) => {
            if (err) {
                reject('Failed to retrieve content');
            } else {
                resolve(content);
            }
        });
    }); 
};
  
function create_content(content, tenant_name) {
    const collection = util.get_content_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.insert(content, (err, content) => {
            if (err) {
                reject('Failed to create content');
            } else {
                resolve(content);
            }
        });
    });
};
  
function update_content(id, content, tenant_name) {
    const collection = util.get_content_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.update(
            { _id: id },
            { $set: content },
            { multi: false },
            (err, result) => {
                if (err) {
                    reject('Failed to update content');
                } else if (result.nModified === 0) {
                    reject('content not found');
                } else {
                    resolve(result);
                }
            }
        );
    });
};
  
function delete_content(id, tenant_name) {
    const collection = util.get_content_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.remove(
            { _id: id },
            { justOne: true },
            (err, result) => {
                if (err) {
                    reject('Failed to delete content');
                } else if (result.n === 0) {
                    reject('content not found');
                } else {
                    resolve({ message: 'content deleted successfully' });
                }
            }
        );
    }); 
};
  
module.exports = {
    get_contents,
    get_content,
    create_content,
    update_content,
    delete_content,
    get_content_by_ids
}