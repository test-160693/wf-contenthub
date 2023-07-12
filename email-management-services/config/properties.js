const propertiesReader = require('properties-reader');

const properties = propertiesReader('config.properties');

const get_value = (path) => {
    return properties.get(path);
}

module.exports = get_value;