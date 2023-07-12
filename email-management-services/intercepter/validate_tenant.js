const util = require('../util/util.js');
const tenant_service = require('../services/tenantservice.js');

const validate_tenant = (req, res, next) => {
    const { tenant_name } = req.headers;
    if (!tenant_name) {
        return res.status(400).json({ error: 'Missing tenant information' });
    }
    const collection = util.get_collection('Administrator', 'tenants');
    tenant_service.get_tenant_by_name(tenant_name, collection)
    .then(result => {
        if(result) {
            req.tenant_name = result.tenant_name;
            next();
        }else {
            return res.status(400).json({ error: 'Tenant information not found' });
        }
    }).catch(error => {
        console.log("error ==== "+error);
        return res.status(400).json({ error: error });
    })
};
module.exports = validate_tenant