let path = require('path')
let bunyan = require('bunyan')

global.log = bunyan.createLogger({
    name: "house_of_fun_logger",
    level: 'info',
    serializers: bunyan.stdSerializers,
    streams: [
      { path: path.join(__dirname, '/../logs/app.log') },
      { stream: process.stdout }
    ]
})

let config = {
    "production": {
      "database": "mongodb://127.0.0.1:27017/alienDB"
    },
    "default": {
      "database": "mongodb://127.0.0.1:27017/alienDB"
    }
  }
  
  
  
  exports.get = function get(env) {
    return config[env] || config.default;
  }
