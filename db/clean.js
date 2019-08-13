var DB_NAME = 'main';
var conn = new Mongo();
var db = conn.getDB(DB_NAME);
db.dropDatabase();