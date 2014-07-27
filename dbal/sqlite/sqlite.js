var sqlite3 = require('sqlite3').verbose()
   , self = new (require('events')).EventEmitter()
;

function init(fd, cb){
   return new sqlite3.Database(fd, sqlite3.OPEN_READWRITE, cb);
};

function insert (db, table, values) {
   // body...
}

function sqlString (s) {
   return '"' + s + '"';
}

module.exports = {
   init: init
   , sqlString : sqlString
};
