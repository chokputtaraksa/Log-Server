"use strict";

var fs  = require("fs"),
    _   = require("lodash"),
    Q   = require("q"),
    serveIndex  = require('serve-index'),
    path        = require('path'),
    serveStatic = require('serve-static');

var LogServices = require("../services/log-services"),
    configs = require('../../configs');


///
/// POST '/:id/log' - Log the request body into a file. Each request will appended
/// into a file.
///
exports.write_log = function(req, res, next){

    var logName = req.params.id;
    var data = "" + JSON.stringify(req.body) + "\n";
    try{
        LogServices.Log(configs.log_root, logName)
        .write(data)
        .then(function(){
            res.status(200).json({
                error: false
            });
        });
    }catch(e){
        console.log(e)
        LogServices.Log(configs.log_root, "log-server")
        .write(e)
        .then(function(){
            res.status(400).json({
                error: true,
                message: e
            });
        });
    }
};