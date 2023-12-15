module.exports = function (err, req, res, next) {
	res.status(404).format({
		'application/json': () => {
			res.json({ message: 'Error 404 not found' });
		},
		'text/html': () => {
			res.send('<h1>Error 404 not found</h1>');
		},
		default: () => {
			res.status(406).send('Not Acceptable');
		},
	});
};
