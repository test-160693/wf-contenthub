'use strict'
const rule_service = require('../services/rules_service.js');

const get_rules = ((req, res) => {
    rule_service.get_rules(req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const get_rule = ((req, res) => {
    const id = Number(req.params.id);
    rule_service.get_rule(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});

const create_rule = ((req, res) => {
    var rule = {};
    rule.name = req.body.name;
    rule.description = req.body.description;
    rule.formula = req.body.formula;
    role.status = 'Active';
    rule_service.get_rule_by_name(rule.name, req.tenant_name)
    .then(result => {
        if(result) {
            res.status(500).json({ message: 'rule already exists' });
        }else {
            rule_service.create_rule(rule, req.tenant_name)
            .then(result => {
                res.status(200).json(result);
            }).catch(error => {
                res.status(500).json({ error: error.message });
            });
        }
    }).catch(error => {
        res.status(500).json({ message: error });
    });
    
});

const update_rule = ((req, res) => {
    var rule = {};
    rule.name = req.body.name;
    rule.description = req.body.description;
    rule.status = req.body.status;
    rule.formula = req.body.formula;
    const id = req.params.id;
    rule_service.update_rule(id, rule, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
})

const delete_rule = ((req, res) => {
    const id = req.params.id;
    rule_service.delete_rule(id, req.tenant_name)
    .then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({ error: error.message });
    });
});


module.exports = {
    get_rule,
    get_rules,
    create_rule,
    update_rule,
    delete_rule
}