var requireDirectory = require('require-directory');
var MongoDB = require('mongodb').Db;
var Server = require('mongodb').Server;


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
}

var model = requireDirectory(module, '../models', {visit: addDB});

// This is the api controller. Used for api routes.
module.exports = {
    survey1Create: {
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
    