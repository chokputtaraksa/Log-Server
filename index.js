

var _           = require('lodash'),
    fs          = require('fs'),
    path        = require('path'),
    express     = require('express'),
    bodyParser  = require('body-parser'),
    simpleargs  = require('simpleargs'),
    serveIndex  = require('serve-index'),
    serveStatic = require('serve-static'),
    cors = require('cors');

var router = require('./app/routes',
    configs = require('./configs'));

///
/// Initialize express
///
var app      = express();

///
/// Process the arguments
///
simpleargs
.define('p','port', null, 'Port number');

var options = simpleargs(process.argv.slice(2));

/// validate the parameters
if(!options.port){
    console.log("Usage:");
    console.log();
    console.log("\t log-server -p PORT -d LOGSDIR");
    console.log();
    process.exit(1);
}

/// normalize options
log_root = path.resolve(configs.log_root);


///
/// Initalize filesystem
///
if (!fs.existsSync(log_root)){
fs.mkdirSync(log_root);
}

// parse text/plain
app.use(bodyParser.raw({ type: 'text/plain', limit: 1024 * 1024 * 10 }));
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(cors());

// Register router to app
router(app);

/// Start server
app.listen(options.port || 10000);

///
/// Show somethin on stdout
///
console.log(
_.template("http://localhost:<%= port %>")({ port: options.port }));

console.log(
_.template("Logs directory '<%= dir %>'")({ dir: log_root }));