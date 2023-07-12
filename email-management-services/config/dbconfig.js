const Db = require('tingodb')().Db;
const get_value = require('../config/properties.js');

const db_path = get_value('db.folder.path');

const tenant_map = new Map();

const getdb = (key) => {
    return tenant_map.get(key);
}

const pushdb = (key, value) => {
    tenant_map.set(key, new Db((db_path + value), {}));
    return tenant_map;
}

const get_collection = (key, collection_name) => {
    const db = tenant_map.get(key);
    return db.collection(collection_name);
}

module.exports = { getdb, pushdb, get_collection }