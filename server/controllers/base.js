var fs = require('fs');
var marked = require('marked');

// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
module.exports = {
    index: {
        handler: function(request, reply){
          // Render the view with the custom greeting
            reply.view('index', {
                title: 'Seedbox Test 2 - Home'
            });
        },
        app: {
            name: 'index'
        }
    },
    docs: {
        handler: function(request, reply) {
            var markdown = fs.readFileSync(__dirname+'/../../docs/'+request.params.doc+'.md', {encoding: 'utf8'});
            
            // Render the view with the custom greeting
            reply.view('doc', {
                title: 'Seedbox Test 2 - Docs',
                text: marked(markdown)
            });
        },
        app: {
            name: 'docs'
        }
    },
    missing: {
        handler: function(request, reply){
            console.log('asdasdasdasd')
            reply.view('404', {
                title: '404 Page'
            }).code(404);
        },
        app: {
            name: '404'
        }
    }
}
