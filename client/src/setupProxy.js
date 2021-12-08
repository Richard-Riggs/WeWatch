// Only gets used when running the create-react-app dev server on local.
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	app.use(proxy('/api', { target: 'http://localhost:8080' }));
	app.use(proxy('/socket.io', { target: 'http://localhost:8080', ws: true }));
};
