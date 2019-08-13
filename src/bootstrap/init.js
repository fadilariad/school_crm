
function auth(app) {
    app.all('*', (req, res, next) => {
        next();
    });
}

module.exports = function(app, express) {
    app.use(express.static('public/dist'));
    app.use(express.json());
	app.use(function(err, req, res, next) {
    	if(!err) return next();
    	res.status(500).send(err);
	});
    auth(app);
}
