const config_map = require('../config/dbconfig.js');
const get_value = require('../config/properties.js');
const fs = require('fs');

const db_path = get_value('db.folder.path');

const get_collection = (tenant_name, collection_name) => {
    return config_map.get_collection(tenant_name, collection_name);
}

const get_tenant_collection = () => {
    return config_map.get_collection("Administrator", "tenants");
}

const get_user_collection = (tenant_name) => {
    return get_collection(tenant_name, "users");
}

const get_user_group_collection = (tenant_name) => {
    return get_collection(tenant_name, "user_groups");
}

const get_roles_collection = (tenant_name) => {
    return get_collection(tenant_name, "roles");
}

const get_content_collection = (tenant_name) => {
    return get_collection(tenant_name, "content");
}

const get_configuration_collection = (tenant_name) => {
    return get_collection(tenant_name, "configuration");
}

const get_resources_collection = (tenant_name) => {
    return get_collection(tenant_name, "resources");
}

const get_permissions_collection = (tenant_name) => {
    return get_collection(tenant_name, "permissions");
}

const get_rules_collection = (tenant_name) => {
    return get_collection(tenant_name, "rules");
}

const get_dynamic_configuration_collection = (tenant_name) => {
    return get_collection(tenant_name, "dynamic_config");
}

const get_resources = () => {
    const resources_path =  get_value('resources.name').split(",");
    const resources = [];
    resources_path.forEach(element => {
        const resource = {};
        resource.name = element;
        resource.description = element;
        resource.status = 'Active';

        resources.push(resource);
    });
    return resources;
}

const get_permissions = () => {
    const permissions_path =  get_value('permissions.name').split(",");
    const permissions = [];
    permissions_path.forEach(element => {
        const permission = {};
        permission.name = element;
        permission.description = element;
        permission.status = 'Active';
        permissions.push(permission);
    });
    return permissions;
}

const get_tenant = (tenant_name, description) => {
    const tenant = {};
    tenant.tenant_name = tenant_name;
    tenant.description = description;
    tenant.path = (db_path + tenant_name);
    return tenant;
}

const get_admin_user = () => {
    const user = {};
    user.firstName = 'Administrator';
    user.lastName = 'Administrator';
    user.userName = 'admin';
    user.password = 'admin';
    user.email = 'admin@admin.com';
    return user;
}

const get_folder = (folder_name) => {
    const folder = db_path + folder_name;
    return fs.existsSync(folder);
}

const create_folder = (folder_name) => {
    return new Promise((resolve, reject) => {
        const folder = db_path + folder_name;
        console.log("folder === "+folder);
        if (!fs.existsSync(folder)) {  
            console.log("folder === "+folder);
            fs.mkdir(folder, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
            });
            resolve(true);
        }
    });
}

const compare_arrays = (source, destination) => {
    return source.filter((item) => !destination.includes(item));
}

module.exports = { 
    get_collection, 
    get_tenant, 
    get_admin_user, 
    create_folder, 
    compare_arrays,
    get_user_collection,
    get_user_group_collection,
    get_roles_collection,
    get_resources_collection,
    get_permissions_collection,
    get_content_collection,
    get_configuration_collection,
    get_rules_collection,
    get_dynamic_configuration_collection,
    get_tenant_collection,
    get_folder,
    get_resources,
    get_permissions
};