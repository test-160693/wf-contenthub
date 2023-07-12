const config = require('./dbconfig.js');
const tenant_service = require('../services/tenantservice.js');
const user_service = require('../services/userservice.js');
const util = require('../util/util.js');
const resource_service = require('../services/resource_service.js');
const permission_service = require('../services/permission_service.js');

const onstartup = (tenant_name, description) => {
    const status = util.get_folder(tenant_name);
    if(!status) {
        create_tenant_user(tenant_name, description).
        then(result => {
            console.log("Tenant created successfully..."+JSON.stringify(result));
        }).catch(error => {
            console.error(error);
        });
    }else {
        config.pushdb('Administrator', 'Administrator');
        const collection = util.get_tenant_collection();
        tenant_service.get_tenants(collection)
        .then(result => {
            result.forEach(element => {
                config.pushdb(element.tenant_name, element.tenant_name);
            });
        }).catch(error => {'unable to fectch details === '+error});  
    }
}

function create_tenant_user(tenant_name, description) {
    return new Promise((resolve, reject) => {
        config.pushdb(tenant_name, tenant_name);
        const tenant = util.get_tenant(tenant_name, description);
        util.create_folder(tenant.tenant_name).
        then(folder_result => {
            const collection = util.get_tenant_collection();
            tenant_service.create_tenant(tenant, collection)
            .then(tenant_result => {
                console.log("Tenant created  === "+JSON.stringify(tenant_result));
                const user = util.get_admin_user();
                user_service.createUser(user, tenant_name)
                .then(user_result => {
                    console.log("User created  === "+JSON.stringify(user_result));
                    resource_service.create_bulk_resources(util.get_resources(), tenant_name).
                    then(resource_result => {
                        console.log("resources created successfully === "+JSON.stringify(resource_result));
                        permission_service.create_bulk_permissions(util.get_permissions(), tenant_name).
                        then(permission_result => {
                            console.log("permissions created successfully === "+JSON.stringify(permission_result));
                            resolve(user_result);
                        }).catch(error => {
                            reject(error);
                        })
                    }).catch(error => {
                        reject(error);
                    });
                }).catch(error => {
                    reject(error);
                });
            }).catch(error => {
                reject(error);
            });
        }).catch(error => {
            reject(error);
        });
    });
}

module.exports = { onstartup, create_tenant_user }