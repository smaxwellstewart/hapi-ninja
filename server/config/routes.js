/**
* Dependencies.
*/
var requireDirectory = require('require-directory');

module.exports = function(server) {
    // Bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
    var controller = requireDirectory(module, '../controllers');

    // Array of routes for Hapi
    var routeTable = [
        // API routes
        // NosQuestions, VosRéponses Inc.
        {
            method: 'POST',
            path: '/api/survey1.json',
            config: controller.api.survey1Create
        },
        {
            method: 'POST',
            path: '/api/survey1/find.json',
            config: controller.api.survey1Find
        },
        {
            method: 'GET',
            path: '/api/survey1/{id}.json',
            config: controller.api.survey1Get
        },
        {
            method: 'PUT',
            path: '/api/survey1/{id}.json',
            config: controller.api.survey1Update
        },
        {
            method: 'DELETE',
            path: '/api/survey1/{id}.json',
            config: controller.api.survey1Delete
        },
        // ParisMonAmi Inc.
        {
            method: 'POST',
            path: '/api/survey2.json',
            config: controller.api.survey2Create
        },
        {
            method: 'POST',
            path: '/api/survey2/find.json',
            config: controller.api.survey2Find
        },
        {
            method: 'GET',
            path: '/api/survey2/{id}.json',
            config: controller.api.survey2Get
        },
        {
            method: 'PUT',
            path: '/api/survey2/{id}.json',
            config: controller.api.survey2Update
        },
        {
            method: 'DELETE',
            path: '/api/survey2/{id}.json',
            config: controller.api.survey2Delete
        },
        // SondageMieux Inc.
        {
            method: 'POST',
            path: '/api/survey3.json',
            config: controller.api.survey3Create
        },
        {
            method: 'POST',
            path: '/api/survey3/find.json',
            config: controller.api.survey3Find
        },
        {
            method: 'GET',
            path: '/api/survey3/{id}.json',
            config: controller.api.survey3Get
        },
        {
            method: 'PUT',
            path: '/api/survey3/{id}.json',
            config: controller.api.survey3Update
        },
        {
            method: 'DELETE',
            path: '/api/survey3/{id}.json',
            config: controller.api.survey3Delete
        },


        // Frontend routes
        {
            method: 'GET',
            path: '/',
            config: controller.base.index
        },
        {
            method: 'GET',
            path: '/about',
            config: controller.base.about
        },
        {
            method: 'GET',
            path: '/blog',
            config: controller.base.blog
        },
        {
            method: 'GET',
            path: '/contact',
            config: controller.base.contact
        },
        {
            method: 'GET',
            path: '/portfolio',
            config: controller.base.portfolio
        },
        {
            method: 'GET',
            path: '/single-post',
            config: controller.base.singlePost
        },
        {
            method: 'GET',
            path: '/single-project',
            config: controller.base.singleProject
        },
        // Missing route
        {
            method: 'GET',
            path: '/{path*}',
            config: controller.base.missing
        },
        // Asset routes
        {
            method: 'GET',
            path: '/partials/{path*}',
            config: controller.assets.partials
        },
        {
            method: 'GET',
            path: '/img/{path*}',
            config: controller.assets.img
        },
        {
            method: 'GET',
            path: '/css/{path*}',
            config: controller.assets.css
        },
        {
            method: 'GET',
            path: '/js/{path*}',
            config: controller.assets.js
        },
        {
            method: 'GET',
            path: '/fonts/{path*}',
            config: controller.assets.fonts
        },
        {
            method: 'GET',
            path: '/bower_components/{path*}',
            config: controller.assets.bower
        },
        {
            method: 'GET',
            path: '/wiki/{path*}',
            config: controller.assets.wiki
        }
    ];
    return routeTable;
}
