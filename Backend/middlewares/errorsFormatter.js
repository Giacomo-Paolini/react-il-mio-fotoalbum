module.exports = function (err, req, res, next) {
	res.format({
		json: () => {
			res.status(500).json({
				message: 'Ops, something went wrong',
				error: err.message,
			});
		},
		default: () => {
			res.status(500).send('<h1>Ops, something went wrong</h1>');
		},
	});
};
