const util = require('../util/util.js');

function getUsers(tenant_name) {
    const collection = util.get_user_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, users) => {
            if (err) {
                reject('Failed to retrieve users');
            } else {
                resolve(users);
            }
        });
    });
};

function get_users_by_ids(ids, tenant_name) {
    const collection = util.get_user_collection(tenant_name);
    console.log("ids === "+ids.length);
    const query = { _id: { $in: ids } };
    return new Promise((resolve, reject) => {
        collection.find(query).toArray((err, users) => {
            if (err) {
                reject('Failed to retrieve users');
            } else {
                console.log("users === "+users);
                resolve(users);
            }
        });
    });   
};

function get_user_by_email(email, tenant_name) {
    const collection = util.get_user_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ email: email }, (err, user) => {
            if (err) {
                reject('Failed to find user');
            } else {
                resolve(user);
            }
        });
    });
};
  
function getUser(id, tenant_name) {
    const collection = util.get_user_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ _id: id }, (err, user) => {
            if (err) {
                reject('Failed to retrieve user');
            } else {
                resolve(user);
            }
        });
    });
    
};
  
function createUser(user, tenant_name) {
    const collection = util.get_user_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.insert(user, (err, result) => {
            if (err) {
                reject('Failed to create user');
            } else {
                resolve(result);
            }
        });
    });
};
  
function loginUser(email, password, tenant_name) {
    const collection = util.get_user_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.findOne({ email, password }, (err, user) => {
            if (err) {
                reject('Failed to find user');
            } else if (!user) {
                reject('Invalid credentials' );
            } else {
                resolve(user);
            }
        });
    });
};
  
function updateUser(id, user, tenant_name) {
    const collection = util.get_user_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.update(
            { _id: id },
            { $set: user },
            { multi: false },
            (err, result) => {
                if (err) {
                    reject('Failed to update user');
                } else if (result.nModified === 0) {
                    reject('user not found');
                } else {
                    resolve(result);
                }
            }
        );
    });
};
  
function deleteUser(id, tenant_name) {
    const collection = util.get_user_collection(tenant_name);
    return new Promise((resolve, reject) => {
        collection.remove(
            { _id: id },
            { justOne: true },
            (err, result) => {
                if (err) {
                    reject('Failed to delete user');
                } else if (result.n === 0) {
                    reject('user not found');
                } else {
                    resolve({ message: 'user deleted successfully' });
                }
            }
        );
    }); 
};
  
module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
    get_user_by_email,
    get_users_by_ids
}