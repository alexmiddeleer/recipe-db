var sqlite3 = require('sqlite3').verbose()
   , self = new (require('events')).EventEmitter()
;

function init(fd, cb){
   return new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, cb);
};

function insert (db, table, values) {
   // body...
}

module.exports = init;
