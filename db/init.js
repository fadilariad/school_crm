var DB_NAME = 'main';
var conn = new Mongo();
var db = conn.getDB(DB_NAME);

/*
db.Users.insert({
    name: "admin",
    role: 'SYS_ADMIN'
});
*/

db.Settings.insert({
	name : "coursesDiscount",
	value : []
});

db.Settings.insert({
	name : "PageRecords",
	value : "25"
});

db.insert({
	name : "DisplayLanguage",
	value : {
		langs : [
			{
				name : "ar",
				displayName : "العربية",
				dir : "rtl"
			},
			{
				name: "he",
				displayName: "עברית",
				dir:"rtl"
			},
			{
				name : "en",
				displayName : "English",
				dir : "ltr"
			}
		],
		selected : "ar"
	}
});