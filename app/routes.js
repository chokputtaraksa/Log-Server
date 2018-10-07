var express = require('express'),
    serveIndex  = require('serve-index'),
    serveStatic = require('serve-static');

var LogServices = require('./views/logs'),
    configs = require('../configs')

module.exports = function(app){

    var api_routes = express.Router();

    // Auth Routes

    // authRoutes.post('/register/provider', ProviderAuthenController.provider_register);

    api_routes.post('/:id/', LogServices.write_log);

    ///
    /// Get '/log' - Log the request body into a file. Each request will appended
    /// into a file.
    ///
    api_routes.get('/*', serveIndex(configs.log_root, { icons: true, view: 'details' }));
    api_routes.get('/*.log', serveStatic(configs.log_root, { icons: true }));

    app.use('/logs', api_routes);

}