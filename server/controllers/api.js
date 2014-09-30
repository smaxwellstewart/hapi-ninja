var requireDirectory = require('require-directory');
var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;
var Hapi = require('hapi');
var Joi = require("joi");

// Add db connection
var db = new MongoDB("seedbox", new Server("127.0.0.1", 27017, {auto_reconnect: true}), {w: 1});
db.open(function(e, d) {
    if (e) {
        console.log(e);
    } else{
        console.log('connected to database :: seedbox');
    }
})

// Function that adds db connection to models and loads request handlers
var addDB = function(model) {
    if(model.collection) {
        model.db = db;
        return require("toothache")(model);
    }
    return model;
}

// Load all models from directory
var model = requireDirectory(module, '../models', {visit: addDB});

// Survey 1 needs a little extra validation to make sure all conditional requirements are met
var survey1Validate = function(request, next) {
    // Make q2 required if q1 is answered true
    if(request.payload.q1 === true) {
        var result = Joi.validate(request.payload.q2, Joi.required())
        if (result.error) {
            var err = Hapi.error.badRequest("ValidationError: q2 is required if q1 is true.");
            return next(err).takeover()
        }
    }
    // Make q3, q4 and q5 required if q2 is answered true
    if(request.payload.q2 === true) {
        var schema = {
            q3: Joi.string().required(),
            q4: Joi.array().required(),
            q5: Joi.array().required(),
        };

        var payload = {
            q3: request.payload.q3,
            q4: request.payload.q4,
            q5: request.payload.q5,
        }
        var result = Joi.validate(payload, schema)
        
        if (result.error) {
            var err = Hapi.error.badRequest("ValidationError: q3, q4 and q5 is required if q2 is true.");
            return next(err).takeover()
        }
    }

    return next('validated');
}

// Survey 3 needs a little extra validation to make sure all percentages of question <= 100
var survey3Validate = function(request, next) {
    var per1 = request.payload.q1;
    var per2 = request.payload.q2;
    if(per1 !== undefined && per1.friendly !== undefined && per1.warm !== undefined && per1.happy !== undefined && per1.generous !== undefined) {
        var totalPercent = per1.friendly + per1.warm + per1.happy + per1.generous;
        var result = Joi.validate(totalPercent, Joi.number().min(0).max(100).required())
        if (result.error) {
            var err = Hapi.error.badRequest("ValidationError: q1 total percentages must be greater than 0 and less than 100.");
            return next(err).takeover()
        }
    }
    if(per2 !== undefined && per2.talkative !== undefined && per2.boring !== undefined && per2.stressed !== undefined && per2.pretentious !== undefined) {
        var totalPercent = per2.talkative + per2.boring + per2.stressed + per2.pretentious;
        var result = Joi.validate(totalPercent, Joi.number().min(0).max(100).required())
        if (result.error) {
            var err = Hapi.error.badRequest("ValidationError: q2 total percentages must be greater than 0 and less than 100.");
            return next(err).takeover()
        }
    }

    return next('validated');
}



// This is the api controller. Used for api routes.
module.exports = {
    survey1Create: {
        pre: [
            {method: survey1Validate, assign: "validated"}
        ],
        handler: model.Survey1.create,
        app: {
            name: 'survey1Create'
        }
    },
    survey1Find: {
        handler: model.Survey1.find,
        app: {
            name: 'survey1Find'
        }
    },
    survey1Get: {
        handler: model.Survey1.get,
        app: {
            name: 'survey1Get'
        }
    },
    survey1Update: {
        handler: model.Survey1.update,
        app: {
            name: 'survey1Update'
        }
    },
    survey1Delete: {
        handler: model.Survey1.del,
        app: {
            name: 'survey1Delete'
        }
    },
    survey2Create: {
        handler: model.Survey2.create,
        app: {
            name: 'survey2Create'
        }
    },
    survey2Find: {
        handler: model.Survey2.find,
        app: {
            name: 'survey2Find'
        }
    },
    survey2Get: {
        handler: model.Survey2.get,
        app: {
            name: 'survey2Get'
        }
    },
    survey2Update: {
        handler: model.Survey2.update,
        app: {
            name: 'survey2Update'
        }
    },
    survey2Delete: {
        handler: model.Survey2.del,
        app: {
            name: 'survey2Delete'
        }
    },
    survey3Create: {
        pre: [
            {method: survey3Validate, assign: "validated"}
        ],
        handler: model.Survey3.create,
        app: {
            name: 'survey3Create'
        }
    },
    survey3Find: {
        handler: model.Survey3.find,
        app: {
            name: 'survey3Find'
        }
    },
    survey3Get: {
        handler: model.Survey3.get,
        app: {
            name: 'survey3Get'
        }
    },
    survey3Update: {
        pre: [
            {method: survey3Validate, assign: "validated"}
        ],
        handler: model.Survey3.update,
        app: {
            name: 'survey3Update'
        }
    },
    survey3Delete: {
        handler: model.Survey3.del,
        app: {
            name: 'survey3Delete'
        }
    }
}
    