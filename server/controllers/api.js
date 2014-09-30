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
    if(request.payload.q1 === true) {
        var result = Joi.validate(request.payload.q2, Joi.required())
        if (result.error) {
            var err = Hapi.error.badRequest("ValidationError: q2 is required if q1 is true.");
            return next(err).takeover()
        }
    }
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
    